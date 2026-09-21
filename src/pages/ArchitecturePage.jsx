import React from 'react';
import { ArchitectureDiagram } from '../components/architecture/ArchitectureDiagram';
import { Layers, Mic, Cpu, Database } from 'lucide-react';

const LAYERS = [
  {
    num: '1',
    color: '#3B82F6',
    icon: <Mic size={16} color="#3B82F6" />,
    title: 'Speech Layer (STT / TTS)',
    desc: 'Sarvam AI (saaras:v3) transcribes user speech in any Indian language. Sarvam TTS (bulbul:v3) speaks the answer back. Azure Speech as fallback.',
  },
  {
    num: '2',
    color: '#A78BFA',
    icon: <Cpu size={16} color="#A78BFA" />,
    title: 'Reasoning Layer (LLM)',
    desc: 'GPT-4.1-mini routes intent, translates non-English queries to English for RAG, then generates the final answer in the user\'s selected language.',
  },
  {
    num: '3',
    color: '#34D399',
    icon: <Database size={16} color="#34D399" />,
    title: 'Grounded RAG Layer',
    desc: 'Azure AI Search (hybrid vector + semantic re-ranking) retrieves from official university ordinances — every answer is cited, zero hallucinations.',
  },
];

export const ArchitecturePage = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span className="badge badge-azure"><Layers size={11} />System Blueprint</span>
          <span className="badge badge-success">3-Layer Pipeline</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: 8 }}>
          Technical Architecture
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Click any step · ▶ Simulate to trace the full voice pipeline
        </p>
      </div>

      {/* Diagram */}
      <div style={{ marginBottom: '2rem' }}>
        <ArchitectureDiagram />
      </div>

      {/* 3 Layer Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {LAYERS.map(({ num, color, icon, title, desc }) => (
          <div key={num} className="card" style={{ padding: '1.25rem', borderTop: `3px solid ${color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: `${color}18`, border: `1px solid ${color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{icon}</div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{num}. {title}</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
