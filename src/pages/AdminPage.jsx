import React, { useState, useEffect, useRef } from 'react';

const BACKEND_URL = 'http://localhost:8000';
const ADMIN_TOKEN_KEY = 'univoice_admin_token';

// ─── Color palette ───
const C = {
  bg: '#050810',
  card: '#0D1224',
  cardBorder: '#1E2D4A',
  blue: '#0078D4',
  blueGlow: 'rgba(0,120,212,0.3)',
  purple: '#8B5CF6',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
};

// ─── Utility ───
const fmt = (n) => (n || 0).toLocaleString();
const TOOL_LABELS = {
  rag_university_ordinances: 'Ordinances RAG',
  get_university_overview_and_ranking: 'University Overview',
  check_library_status: 'Library Lookup',
  find_faculty_contact: 'Faculty Contact',
  check_fee_deadlines: 'Fee Deadlines',
  out_of_scope: 'Out of Scope',
};

// ─── Mini Line Chart ───
function LineChart({ data, color = C.blue }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const pad = { top: 10, right: 10, bottom: 24, left: 32 };
    ctx.clearRect(0, 0, W, H);
    const vals = data.map(d => d.value);
    const maxV = Math.max(...vals, 1);
    const xStep = (W - pad.left - pad.right) / Math.max(data.length - 1, 1);
    const yScale = (H - pad.top - pad.bottom) / maxV;
    const x = (i) => pad.left + i * xStep;
    const y = (v) => H - pad.bottom - v * yScale;

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const yy = pad.top + ((H - pad.top - pad.bottom) / 3) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, yy); ctx.lineTo(W - pad.right, yy); ctx.stroke();
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
    gradient.addColorStop(0, color + '55');
    gradient.addColorStop(1, color + '00');
    ctx.beginPath();
    data.forEach((d, i) => i === 0 ? ctx.moveTo(x(i), y(d.value)) : ctx.lineTo(x(i), y(d.value)));
    ctx.lineTo(x(data.length - 1), H - pad.bottom);
    ctx.lineTo(x(0), H - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    data.forEach((d, i) => i === 0 ? ctx.moveTo(x(i), y(d.value)) : ctx.lineTo(x(i), y(d.value)));
    ctx.stroke();

    // Dots
    data.forEach((d, i) => {
      ctx.beginPath();
      ctx.arc(x(i), y(d.value), 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = C.card;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // X labels
    ctx.fillStyle = C.textMuted;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      const label = d.label.slice(5); // MM-DD
      ctx.fillText(label, x(i), H - 6);
    });
  }, [data, color]);

  return <canvas ref={canvasRef} width={560} height={160} style={{ width: '100%', height: 160 }} />;
}

// ─── Bar Chart ───
function BarChart({ data, color = C.purple }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const pad = { top: 10, right: 10, bottom: 50, left: 10 };
    ctx.clearRect(0, 0, W, H);
    const vals = data.map(d => d.value);
    const maxV = Math.max(...vals, 1);
    const barW = (W - pad.left - pad.right) / data.length - 8;
    const yScale = (H - pad.top - pad.bottom) / maxV;

    data.forEach((d, i) => {
      const bx = pad.left + i * ((W - pad.left - pad.right) / data.length) + 4;
      const bh = d.value * yScale;
      const by = H - pad.bottom - bh;
      // Bar
      const grad = ctx.createLinearGradient(0, by, 0, H - pad.bottom);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '44');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(bx, by, barW, bh, [4, 4, 0, 0]);
      ctx.fill();
      // Value label
      ctx.fillStyle = C.textSecondary;
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.value, bx + barW / 2, by - 4);
      // Label
      ctx.fillStyle = C.textMuted;
      ctx.font = '9px Inter, sans-serif';
      const labelParts = d.label.split(' ');
      labelParts.forEach((part, li) => {
        ctx.fillText(part, bx + barW / 2, H - pad.bottom + 14 + li * 12);
      });
    });
  }, [data, color]);

  return <canvas ref={canvasRef} width={500} height={180} style={{ width: '100%', height: 180 }} />;
}

// ─── Status Badge ───
function StatusBadge({ status }) {
  const colors = {
    operational: { bg: 'rgba(16,185,129,0.15)', color: C.green, dot: C.green, label: 'Operational' },
    degraded: { bg: 'rgba(245,158,11,0.15)', color: C.yellow, dot: C.yellow, label: 'Degraded' },
    down: { bg: 'rgba(239,68,68,0.15)', color: C.red, dot: C.red, label: 'Down' },
  };
  const s = colors[status] || colors.down;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.color,
      padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block', boxShadow: `0 0 6px ${s.dot}` }} />
      {s.label}
    </span>
  );
}

// ─── Stat Card ───
function StatCard({ label, value, sub, color = C.blue, icon }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.cardBorder}`,
      borderRadius: 16, padding: '1.25rem 1.5rem',
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: C.textMuted, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
          <div style={{ color: C.textPrimary, fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ color: C.textMuted, fontSize: '0.78rem', marginTop: 4 }}>{sub}</div>}
        </div>
        {icon && <div style={{ fontSize: 28, opacity: 0.7 }}>{icon}</div>}
      </div>
    </div>
  );
}

// ─── Login Page ───
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (resp.ok && data.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        onLogin(data.token);
      } else {
        setError(data.detail || 'Invalid credentials');
      }
    } catch {
      setError('Could not connect to backend. Make sure the server is running.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: C.card, border: `1px solid ${C.cardBorder}`,
        borderRadius: 24, padding: '2.5rem 2rem', width: 380, maxWidth: '90vw',
        boxShadow: `0 0 80px rgba(0,120,212,0.15)`,
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #0078D4, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, boxShadow: '0 0 30px rgba(0,120,212,0.4)',
          }}>🎓</div>
          <h1 style={{ color: C.textPrimary, fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>UniVoice Admin</h1>
          <p style={{ color: C.textMuted, fontSize: '0.85rem', marginTop: 6 }}>Sign in to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: C.textSecondary, fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="admin@gmail.com"
              style={{
                width: '100%', padding: '0.75rem 1rem', background: '#0A0E1A',
                border: `1px solid ${C.cardBorder}`, borderRadius: 10, color: C.textPrimary,
                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: C.textSecondary, fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '0.75rem 1rem', background: '#0A0E1A',
                border: `1px solid ${C.cardBorder}`, borderRadius: 10, color: C.textPrimary,
                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>
          {error && <div style={{ color: C.red, fontSize: '0.82rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '0.85rem',
              background: 'linear-gradient(135deg, #0078D4, #0055A0)',
              border: 'none', borderRadius: 12, color: '#fff',
              fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
              fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in…' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ───
function Dashboard({ token, onLogout }) {
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const authHeaders = { 'X-Admin-Token': token };

  const fetchStats = async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/api/admin/stats`, { headers: authHeaders });
      if (r.ok) setStats(await r.json());
    } catch { }
  };

  const fetchHealth = async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/api/admin/service-health`, { headers: authHeaders });
      if (r.ok) setHealth(await r.json());
    } catch { }
  };

  useEffect(() => {
    fetchStats();
    fetchHealth();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus('Uploading and indexing PDF...');
    const form = new FormData();
    form.append('file', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/admin/upload-pdf`, {
        method: 'POST', headers: authHeaders, body: form,
      });
      const d = await r.json();
      setUploadStatus(d.message || 'Done!');
      fetchStats();
    } catch {
      setUploadStatus('Upload failed. Check backend logs.');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Prepare chart data
  const lineData = stats ? Object.entries(stats.last_7_days || {}).map(([k, v]) => ({ label: k, value: v })) : [];
  const barData = stats ? Object.entries(stats.tool_hits || {})
    .map(([k, v]) => ({ label: TOOL_LABELS[k] || k, value: v }))
    .sort((a, b) => b.value - a.value) : [];

  const totalServiceCalls = stats
    ? Object.values(stats.service_calls_total || {}).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif", color: C.textPrimary }}>
      {/* Header */}
      <div style={{
        background: C.card, borderBottom: `1px solid ${C.cardBorder}`,
        padding: '0 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🎓</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: C.textPrimary }}>UniVoice Admin</div>
            <div style={{ color: C.textMuted, fontSize: '0.72rem' }}>Dashboard</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: C.textMuted, fontSize: '0.8rem' }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <button onClick={onLogout} style={{
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            color: C.red, padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit',
          }}>Sign Out</button>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* ── OVERVIEW SECTION ── */}
        <div>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <StatCard label="Total Queries" value={fmt(stats?.total_queries)} sub="All time" color={C.blue} icon="🗣️" />
              <StatCard label="Today's Queries" value={fmt(stats?.today_queries)} sub={new Date().toLocaleDateString('en-IN')} color={C.purple} icon="📅" />
              <StatCard label="Sarvam API Calls" value={fmt(stats?.service_calls_total?.sarvam_stt + stats?.service_calls_total?.sarvam_tts)} sub="STT + TTS combined" color="#8B5CF6" icon="🎤" />
              <StatCard label="Azure Speech Calls" value={fmt(stats?.service_calls_total?.azure_speech_tts)} sub="Neural TTS" color={C.blue} icon="☁️" />
              <StatCard label="Azure OpenAI Calls" value={fmt(stats?.service_calls_total?.azure_openai)} sub="GPT-4.1-mini" color={C.green} icon="🤖" />
              <StatCard label="Azure Search Calls" value={fmt(stats?.service_calls_total?.azure_search)} sub="RAG retrievals" color={C.yellow} icon="🔍" />
            </div>

            {/* Line Chart */}
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>📈 Daily Queries — Last 7 Days</div>
              {lineData.length > 0
                ? <LineChart data={lineData} color={C.blue} />
                : <div style={{ color: C.textMuted, textAlign: 'center', padding: '2rem' }}>No query data yet. Ask the assistant a question to see stats here!</div>
              }
            </div>

            {/* Bar Chart — Tool Hits */}
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>🔧 Most Used Tools</div>
              {barData.some(d => d.value > 0)
                ? <BarChart data={barData} color={C.purple} />
                : <div style={{ color: C.textMuted, textAlign: 'center', padding: '2rem' }}>No tool usage data yet.</div>
              }
            </div>

            {/* Top Tool Summary */}
            {barData.length > 0 && barData[0].value > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,120,212,0.1))',
                border: `1px solid rgba(139,92,246,0.3)`, borderRadius: 16, padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <span style={{ fontSize: 36 }}>🏆</span>
                <div>
                  <div style={{ color: C.textMuted, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Most Hit Tool</div>
                  <div style={{ color: C.textPrimary, fontWeight: 800, fontSize: '1.2rem' }}>{barData[0].label}</div>
                  <div style={{ color: C.textMuted, fontSize: '0.82rem' }}>{barData[0].value} queries routed to this tool</div>
                </div>
              </div>
            )}
        </div>

        {/* ── SERVICES SECTION ── */}
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: '1.1rem' }}>⚡ Live Service Health</div>
              <button onClick={fetchHealth} style={{
                background: 'rgba(0,120,212,0.15)', border: '1px solid rgba(0,120,212,0.3)',
                color: C.blue, padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit',
              }}>🔄 Refresh</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {health ? Object.entries(health.services).map(([key, svc]) => (
                <div key={key} style={{
                  background: C.card, border: `1px solid ${C.cardBorder}`,
                  borderRadius: 16, padding: '1.5rem',
                  borderLeft: `4px solid ${svc.status === 'operational' ? C.green : svc.status === 'degraded' ? C.yellow : C.red}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: '0.95rem' }}>{svc.name}</div>
                    <StatusBadge status={svc.status} />
                  </div>
                  {svc.model && <div style={{ color: C.textMuted, fontSize: '0.78rem' }}>Model: <span style={{ color: C.textSecondary }}>{svc.model}</span></div>}
                  {svc.region && <div style={{ color: C.textMuted, fontSize: '0.78rem' }}>Region: <span style={{ color: C.textSecondary }}>{svc.region}</span></div>}
                  {svc.index && <div style={{ color: C.textMuted, fontSize: '0.78rem' }}>Index: <span style={{ color: C.textSecondary }}>{svc.index}</span></div>}
                  {svc.error && <div style={{ color: C.red, fontSize: '0.75rem', marginTop: 4 }}>{svc.error}</div>}
                </div>
              )) : (
                <div style={{ color: C.textMuted, textAlign: 'center', padding: '3rem', gridColumn: '1/-1' }}>Loading service status...</div>
              )}
            </div>
        </div>

        {/* ── PDF MANAGER SECTION ── */}
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ color: C.textPrimary, fontWeight: 700, fontSize: '1.1rem' }}>📄 PDF Knowledge Base</div>
                <div style={{ color: C.textMuted, fontSize: '0.82rem', marginTop: 4 }}>Uploaded PDFs are indexed into Azure AI Search for instant voice query retrieval.</div>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  background: 'linear-gradient(135deg, #0078D4, #0055A0)',
                  border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 12,
                  cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'inherit',
                  opacity: uploading ? 0.6 : 1,
                }}
              >
                {uploading ? '⏳ Indexing...' : '+ Upload PDF'}
              </button>
              <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleUpload} />
            </div>

            {uploadStatus && (
              <div style={{
                background: uploadStatus.includes('failed') ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                border: `1px solid ${uploadStatus.includes('failed') ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                color: uploadStatus.includes('failed') ? C.red : C.green,
                padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1rem', fontSize: '0.85rem',
              }}>
                {uploadStatus}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {(stats?.indexed_pdfs || []).length > 0
                ? stats.indexed_pdfs.map((pdf, i) => (
                  <div key={i} style={{
                    background: C.card, border: `1px solid ${C.cardBorder}`,
                    borderRadius: 14, padding: '1.25rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    }}>📄</div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ color: C.textPrimary, fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pdf}</div>
                      <div style={{ color: C.green, fontSize: '0.72rem', marginTop: 2, fontWeight: 600 }}>✓ Indexed in Azure AI Search</div>
                    </div>
                  </div>
                ))
                : (
                  <div style={{
                    gridColumn: '1/-1', background: C.card, border: `1px dashed ${C.cardBorder}`,
                    borderRadius: 16, padding: '3rem', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 48, marginBottom: '1rem' }}>📭</div>
                    <div style={{ color: C.textSecondary, fontWeight: 600 }}>No PDFs indexed yet</div>
                    <div style={{ color: C.textMuted, fontSize: '0.82rem', marginTop: 4 }}>Upload a PDF to add it to the knowledge base</div>
                  </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ───
export const AdminPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY));

  const handleLogin = (t) => setToken(t);
  const handleLogout = () => { localStorage.removeItem(ADMIN_TOKEN_KEY); setToken(null); };

  if (!token) return <LoginPage onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
};

export default AdminPage;
