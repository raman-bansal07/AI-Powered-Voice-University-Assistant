import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Activity, Database, FileText, AlertCircle, CheckCircle2, XCircle, Coins, Users } from 'lucide-react';
import { DocumentUploader } from '../components/admin/DocumentUploader';

export const AdminPage = () => {
  const { isAdminAuthenticated, navigateTo, userRole, setUserRole } = useApp();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigateTo('about');
    }
  }, [isAdminAuthenticated, navigateTo]);

  if (!isAdminAuthenticated) return null;

  return (
    <div className="container" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield color="#F59E0B" /> Enterprise Admin Dashboard
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: 5 }}>Manage telemetry, knowledge base, and security.</p>
        </div>
        
        {/* Role Simulator */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 15 }}>
          <div style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Users size={14}/> RBAC Simulator:
          </div>
          <select 
            value={userRole} 
            onChange={e => setUserRole(e.target.value)}
            style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '5px 10px', borderRadius: 4, outline: 'none' }}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="guest">Guest</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Telemetry & Tokens */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <Activity size={18} color="#3B82F6"/> Live Telemetry
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', padding: '1rem', borderRadius: 8 }}>
              <div style={{ fontSize: '0.75rem', color: '#93C5FD' }}>Queries Today</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EFF6FF' }}>1,245</div>
            </div>
            <div style={{ background: 'rgba(245,158,11,0.1)', padding: '1rem', borderRadius: 8 }}>
              <div style={{ fontSize: '0.75rem', color: '#FCD34D' }}>Tokens Consumed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FEF3C7' }}>482k</div>
              <div style={{ fontSize: '0.65rem', color: '#FBBF24', marginTop: 4 }}>Est. Cost: $0.48</div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 8 }}>Language Distribution</div>
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '45%', background: '#3B82F6' }} title="Hindi (45%)"></div>
              <div style={{ width: '30%', background: '#10B981' }} title="English (30%)"></div>
              <div style={{ width: '15%', background: '#F59E0B' }} title="Tamil (15%)"></div>
              <div style={{ width: '10%', background: '#6366F1' }} title="Telugu (10%)"></div>
            </div>
            <div style={{ display: 'flex', gap: 15, marginTop: 8, fontSize: '0.7rem', color: '#64748B' }}>
              <span><span style={{color: '#3B82F6'}}>●</span> Hindi</span>
              <span><span style={{color: '#10B981'}}>●</span> Eng</span>
              <span><span style={{color: '#F59E0B'}}>●</span> Tamil</span>
              <span><span style={{color: '#6366F1'}}>●</span> Telugu</span>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <Database size={18} color="#10B981"/> System Health & Failover
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Azure OpenAI (LLM)', status: 'operational', latency: '420ms' },
              { name: 'Azure AI Search (Vector DB)', status: 'operational', latency: '110ms' },
              { name: 'Sarvam AI (TTS Primary)', status: 'operational', latency: '350ms' },
              { name: 'Azure Speech (TTS Backup)', status: 'standby', latency: '-' },
            ].map(service => (
              <div key={service.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
                  {service.status === 'operational' ? <CheckCircle2 size={14} color="#10B981"/> : 
                   service.status === 'standby' ? <AlertCircle size={14} color="#94A3B8"/> : 
                   <XCircle size={14} color="#EF4444"/>}
                  {service.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{service.latency}</span>
                  <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: 10, background: service.status === 'operational' ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.1)', color: service.status === 'operational' ? '#10B981' : '#94A3B8' }}>
                    {service.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* RAG Knowledge Base Manager */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <FileText size={18} color="#8B5CF6"/> Knowledge Base Manager (RAG)
          </h3>
          <DocumentUploader />
          
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '1rem' }}>Active Indexed Documents</h4>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <tr>
                    <th style={{ padding: '10px', color: '#94A3B8', fontWeight: 600 }}>Filename</th>
                    <th style={{ padding: '10px', color: '#94A3B8', fontWeight: 600 }}>Chunks</th>
                    <th style={{ padding: '10px', color: '#94A3B8', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Fee_Rules_2025.pdf</td>
                    <td style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>42</td>
                    <td style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}><button style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.75rem' }}>Delete</button></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Hostel_Guidelines.pdf</td>
                    <td style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>115</td>
                    <td style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}><button style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.75rem' }}>Delete</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Missing Knowledge Tracker */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <AlertCircle size={18} color="#F43F5E"/> Missing Knowledge Tracker
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1rem' }}>
            These queries were blocked by guardrails or had no RAG context. Upload new PDFs to address them.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { query: 'What are the bus timings from campus to city?', count: 42, reason: 'No RAG Data' },
              { query: 'How do I apply for the alumni scholarship?', count: 18, reason: 'No RAG Data' },
              { query: 'Who won the IPL match yesterday?', count: 12, reason: 'Out of Scope Blocked' },
              { query: 'Where is Dr. Sharma\'s house?', count: 5, reason: 'Privacy Guardrail Blocked' },
            ].map((log, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 6, borderLeft: log.reason.includes('Blocked') ? '3px solid #F43F5E' : '3px solid #F59E0B' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 500 }}>"{log.query}"</span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{log.count} times</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: log.reason.includes('Blocked') ? '#FDA4AF' : '#FDE68A' }}>
                  {log.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
