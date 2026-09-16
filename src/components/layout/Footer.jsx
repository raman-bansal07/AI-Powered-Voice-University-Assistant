import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bot, ShieldCheck, Zap, Layers, Cpu, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
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
              Enterprise-grade Multilingual Voice AI assistant for university academic rules, exam schedules, and student queries.
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
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <div
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Platform Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
                >
                  Overview & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('assistant')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
                >
                  Interactive Voice Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('architecture')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
                >
                  3-Layer Architecture Diagram
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('knowledge')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
                >
                  RAG Knowledge Base & Chunks
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('technology')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
                >
                  Azure Cloud Services Stack
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('security')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
                >
                  Entra ID Zero-Trust RBAC
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Azure Cloud AI Stack */}
          <div>
            <div
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Core Azure AI Stack
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#0078D4' }}>•</span>
                <span>Azure AI Speech (STT / Neural TTS)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#0078D4' }}>•</span>
                <span>Azure OpenAI (GPT-4o Reasoning)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#0078D4' }}>•</span>
                <span>Azure AI Search (Hybrid RAG)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#0078D4' }}>•</span>
                <span>Microsoft Entra ID (Zero-Trust RBAC)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Capstone Details */}
          <div>
            <div
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Capstone Project
            </div>
            <p style={{ color: '#94A3B8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Chitkara University Institute of Engineering & Technology
            </p>
            <p style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '1rem' }}>
              Department of Computer Science & Engineering • Academic Year 2025–2026
            </p>
            <button
              onClick={() => navigateTo('team')}
              className="btn btn-secondary btn-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
              }}
            >
              <span>View Team & Authors</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#64748B',
          }}
        >
          <div>
            © 2025–2026 Chitkara University Capstone Team. Built on Microsoft Azure Cloud AI.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Zero Data Leakage Architecture</span>
            <span>100% Grounded Attributions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
