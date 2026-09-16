import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bot, ShieldCheck, Zap, Layers, Cpu, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer
      style={{
        backgroundColor: '#0B132B',
        color: '#94A3B8',
        borderTop: '1px solid #1E293B',
        marginTop: 'auto',
        padding: '3rem 0 1.75rem 0',
        fontSize: '0.8125rem',
      }}
    >
      <div className="container">
        {/* Main 4-Column Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid #1E293B',
          }}
        >
          {/* Column 1: Brand & Powered By */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'var(--azure-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Sparkles size={15} />
              </div>
              <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
                UnivAI
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Enterprise-grade Multilingual Voice AI assistant for university academic rules, exam schedules, and ERP student workflows.
            </p>
            {/* Prominent Powered By Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(0, 120, 212, 0.12)',
                  border: '1px solid rgba(0, 120, 212, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#38BDF8',
                  fontWeight: 600,
                  width: 'fit-content',
                }}
              >
                <Cpu size={13} />
                <span>Powered by Microsoft Azure AI</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(236, 72, 153, 0.12)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#F472B6',
                  fontWeight: 600,
                  width: 'fit-content',
                }}
              >
                <Zap size={13} />
                <span>Powered by Sarvam AI (Indic Voice & LLM)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <div
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Platform Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { route: 'about', label: 'Overview' },
                { route: 'assistant', label: 'Interactive Voice AI' },
                { route: 'architecture', label: 'System Architecture' },
                { route: 'knowledge', label: 'Knowledge Base & RAG' },
                { route: 'technology', label: 'Azure Stack Specifications' },
                { route: 'security', label: 'Security & Zero-Trust RBAC' },
                { route: 'team', label: 'Evaluation Rubric & Team' },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    onClick={() => navigateTo(item.route as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: AI & Voice Technology */}
          <div>
            <div
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              AI & Voice Stack
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F472B6' }} />
                <span>Sarvam AI Indic Speech (Saaras / Bulbul)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8' }} />
                <span>Microsoft Foundry Agent (GPT-4o)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
                <span>Azure AI Search (Hybrid Vector/BM25)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A78BFA' }} />
                <span>Azure Functions (Serverless ERP Tools)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FBBF24' }} />
                <span>Microsoft Entra ID (Zero-Trust RBAC)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Academic Evaluation */}
          <div>
            <div
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Academic Portal
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1rem' }}>
              Senior Capstone Project (2025–2026). Department of Computer Science & Engineering (CSE - AI/ML).
            </p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('team')}
              style={{
                background: '#1E293B',
                borderColor: '#334155',
                color: '#F8FAFC',
                fontSize: '0.75rem',
                gap: '6px',
              }}
            >
              <ShieldCheck size={13} color="#4ADE80" />
              <span>View Evaluator Rubric</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            fontSize: '0.75rem',
            color: '#64748B',
          }}
        >
          <div>
            © 2025–2026 UnivAI Assistant. Academic Capstone Project.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Powered by <strong style={{ color: '#E2E8F0' }}>Microsoft Azure</strong> & <strong style={{ color: '#F472B6' }}>Sarvam AI</strong></span>
            <span>•</span>
            <span>10 Indic Locales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
