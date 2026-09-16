import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Bot,
  Mic,
  Search,
  Zap,
  ArrowRight,
  Globe,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, triggerVoiceQuerySimulation, selectedLanguage } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '1.5rem 0 4rem 0' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 1rem 1rem 1rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <span className="badge badge-azure">
            <Sparkles size={12} />
            Senior Capstone • Azure Cloud AI
          </span>
          <span className="badge">
            <Globe size={12} color="#0078D4" />
            10+ Indian Neural Locales
          </span>
          <span className="badge badge-success">
            <ShieldCheck size={12} />
            100% Grounded RAG
          </span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.18,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}
        >
          Multilingual Voice-Based <br />
          <span style={{ color: '#0078D4' }}>University AI Assistant</span>
        </h1>

        {/* Hero Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
            color: '#475569',
            maxWidth: '720px',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Speak naturally in your native Indian language to receive verified, citation-backed answers on academic regulations, exam schedules, and ERP student actions.
        </p>

        {/* Hero Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <button
            className="btn btn-primary btn-lg"
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
            <span>Explore Architecture</span>
          </button>
        </div>

        {/* Interactive Quick Voice Teaser */}
        <div
          className="card"
          style={{
            width: '100%',
            maxWidth: '680px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', minWidth: 0 }}>
            <div
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
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A' }}>
                Test Sample Query ({selectedLanguage.name})
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
              setTimeout(() => triggerVoiceQuerySimulation(), 400);
            }}
            style={{ flexShrink: 0 }}
          >
            <Sparkles size={13} />
            <span>Try Voice</span>
          </button>
        </div>
      </section>

      {/* 2. THREE PILLARS SECTION */}
      <section className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-tag">CORE CAPABILITIES</div>
          <h2 className="section-title">Built on Microsoft Azure AI</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A unified pipeline integrating speech synthesis, deterministic knowledge retrieval, and serverless actions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ borderTop: '3px solid #0078D4' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Mic size={20} color="#0078D4" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              10+ Indic Neural Voices
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55 }}>
              Powered by Sarvam AI & Azure AI Speech with native dialect recognition and natural neural voice responses in Hindi, Tamil, Telugu, Marathi, and English.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #7C3AED' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Search size={20} color="#7C3AED" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Grounded RAG Search
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55 }}>
              Azure AI Search performs hybrid vector and semantic ranking over official university circulars, guaranteeing verified page and section citations.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #059669' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={20} color="#059669" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Serverless Actions
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55 }}>
              Azure Functions execute student workflows: QR hall ticket generation, real-time fee queries, and attendance computation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS BAR */}
      <section className="container">
        <div
          style={{
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '1.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38BDF8' }}>10+</div>
            <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Indian Languages</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4ADE80' }}>100%</div>
            <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Grounded Attributions</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FBBF24' }}>&lt;450ms</div>
            <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Speech Synthesis</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#C084FC' }}>Zero-Trust</div>
            <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Microsoft Entra ID</div>
          </div>
        </div>
      </section>
    </div>
  );
};
