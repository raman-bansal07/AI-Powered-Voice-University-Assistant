import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Bot,
  Mic,
  Search,
  ArrowRight,
  Globe,
  Layers,
  ShieldCheck,
  Volume2,
} from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo, triggerVoiceQuerySimulation, selectedLanguage } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', padding: '2rem 0 5rem 0' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1.5rem 1.5rem 0.5rem 1.5rem',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span className="badge badge-azure">
            <Sparkles size={12} />
            Azure Cloud AI
          </span>
          <span className="badge">
            <Globe size={12} color="#0078D4" />
            10+ Indian Languages
          </span>
          <span className="badge badge-success">
            <ShieldCheck size={12} />
            100% Grounded RAG
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}
        >
          Multilingual Voice AI <br />
          <span style={{ color: '#0078D4' }}>for University Academics</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
            color: '#475569',
            maxWidth: '580px',
            lineHeight: 1.5,
            marginBottom: '2rem',
          }}
        >
          Instant answers on academic rules, exams, and attendance in your native language.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <button
            className="btn btn-primary btn-lg animate-glow"
            onClick={() => navigateTo('assistant')}
          >
            <Bot size={18} />
            <span>Launch Voice Assistant</span>
            <ArrowRight size={16} />
          </button>

          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigateTo('architecture')}
          >
            <Layers size={18} color="#0078D4" />
            <span>Architecture</span>
          </button>
        </div>

        {/* Quick Voice Teaser */}
        <div
          className="card"
          style={{
            width: '100%',
            maxWidth: '580px',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', minWidth: 0 }}>
            <div
              className="animate-float"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#EFF6FF',
                color: '#0078D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Mic size={18} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>
                Query ({selectedLanguage.name})
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                "{selectedLanguage.samplePrompt}"
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              navigateTo('assistant');
              setTimeout(() => triggerVoiceQuerySimulation(), 300);
            }}
            style={{ flexShrink: 0 }}
          >
            <Sparkles size={13} />
            <span>Try Voice</span>
          </button>
        </div>
      </section>

      {/* 2. THREE PILLARS (Clean & Minimal) */}
      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div className="card card-hover" style={{ padding: '1.5rem', borderTop: '3px solid #0078D4', borderRadius: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Mic size={20} color="#0078D4" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Indic Voice AI
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5 }}>
              10+ regional Indian voices with sub-150ms latency via Azure AI Speech.
            </p>
          </div>

          <div className="card card-hover" style={{ padding: '1.5rem', borderTop: '3px solid #7C3AED', borderRadius: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Search size={20} color="#7C3AED" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Grounded RAG
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5 }}>
              Hybrid search on Azure AI Search ensures zero hallucinations with citations.
            </p>
          </div>

          <div className="card card-hover" style={{ padding: '1.5rem', borderTop: '3px solid #059669', borderRadius: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} color="#059669" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Zero-Trust RBAC
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5 }}>
              Entra ID token validation protects student records and confidential data.
            </p>
          </div>
        </div>
      </section>

      {/* 3. METRICS BAR */}
      <section className="container">
        <div
          style={{
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '1.5rem 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38BDF8' }}>10+</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Languages</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4ADE80' }}>100%</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Grounded</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FBBF24' }}>&lt;450ms</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Voice Latency</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#C084FC' }}>Zero-Trust</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Entra ID</div>
          </div>
        </div>
      </section>
    </div>
  );
};
