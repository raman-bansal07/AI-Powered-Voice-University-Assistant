import React from 'react';
import { useApp } from '../../context/AppContext';
import { FallbackMode } from '../../types/assistant';
import { ShieldAlert, CheckCircle, AlertTriangle, RefreshCw, KeyRound, WifiOff } from 'lucide-react';

export const ErrorFallbackSimulator: React.FC = () => {
  const { fallbackMode, setFallbackMode, triggerVoiceQuerySimulation } = useApp();

  const modes: { id: FallbackMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'none',
      label: 'Standard Grounded Mode (Normal)',
      icon: <CheckCircle size={16} color="#10B981" />,
      desc: 'All Azure pipelines operating at 100% health with strict grounding.',
    },
    {
      id: 'stt_low_snr',
      label: 'STT Low SNR / Background Noise',
      icon: <WifiOff size={16} color="#EF4444" />,
      desc: 'Simulates noisy campus audio. Speech confidence drops < 0.60; assistant requests clearer input.',
    },
    {
      id: 'rag_out_of_bounds',
      label: 'RAG Out-of-Domain Guardrail',
      icon: <AlertTriangle size={16} color="#F59E0B" />,
      desc: 'Student asks non-university trivia. Cosine similarity < 0.70; agent strictly refuses to fabricate.',
    },
    {
      id: 'functions_timeout',
      label: 'Azure Functions ERP Timeout',
      icon: <RefreshCw size={16} color="#EF4444" />,
      desc: 'Simulates legacy database failure (>5.0s). Assistant provides graceful fallback message.',
    },
    {
      id: 'entra_unauthorized',
      label: 'Entra ID Auth Barrier (Guest Mode)',
      icon: <KeyRound size={16} color="#8B5CF6" />,
      desc: 'Guest asks for private GPA/Fee receipts. Entra ID token blocks access and requests student login.',
    },
  ];

  return (
    <div
      className="card"
      style={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
        <ShieldAlert size={18} color="#0078D4" />
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
          Evaluator Reliability Lab — Graceful Fallback & Guardrails Simulator
        </span>
      </div>
      <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1rem' }}>
        Test how the assistant gracefully manages real-world edge cases without crashing, hallucinating, or exposing private data:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {modes.map((m) => {
          const isSelected = fallbackMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setFallbackMode(m.id);
                if (m.id !== 'none') {
                  triggerVoiceQuerySimulation('Test fallback condition for: ' + m.label);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '0.75rem',
                borderRadius: '8px',
                border: isSelected ? '1.5px solid #0078D4' : '1px solid #CBD5E1',
                backgroundColor: isSelected ? '#FFFFFF' : '#FFFFFF',
                boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 120, 212, 0.15)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ marginTop: '2px' }}>{m.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? '#0078D4' : '#1E293B',
                    marginBottom: '2px',
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontSize: '0.71875rem', color: '#64748B', lineHeight: 1.4 }}>
                  {m.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
