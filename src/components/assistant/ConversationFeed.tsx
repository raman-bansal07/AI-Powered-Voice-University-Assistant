import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Message, Citation } from '../../types/assistant';
import { Badge } from '../common/Badge';
import {
  Bot,
  User,
  Volume2,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  ArrowRight,
  Download,
  ShieldAlert,
} from 'lucide-react';

export const ConversationFeed: React.FC = () => {
  const { messages, setActiveCitation, isPlayingAudio, setIsPlayingAudio } = useApp();
  const [expandedTraces, setExpandedTraces] = useState<Record<string, boolean>>({});
  const [executedActions, setExecutedActions] = useState<Record<string, boolean>>({});

  const toggleTrace = (id: string) => {
    setExpandedTraces((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleActionClick = (actionId: string, title: string) => {
    setExecutedActions((prev) => ({ ...prev, [actionId]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
      {messages.map((msg) => {
        const isAssistant = msg.sender === 'assistant';
        const isTraceOpen = !!expandedTraces[msg.id];

        return (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: isAssistant ? '#FFFFFF' : '#F1F5F9',
              border: isAssistant ? '1px solid #E2E8F0' : '1px solid #CBD5E1',
              boxShadow: isAssistant ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {/* Sender Avatar */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: isAssistant ? '#0078D4' : '#334155',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {isAssistant ? <Bot size={20} /> : <User size={20} />}
            </div>

            {/* Message Body */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Header: Name, Timestamp, Telemetry */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>
                    {isAssistant ? 'UnivAI Assistant (Microsoft Azure)' : 'Student Voice Query'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{msg.timestamp}</span>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {msg.transcriptionConfidence && (
                    <Badge variant="success" icon={<CheckCircle2 size={12} />}>
                      STT Acc: {(msg.transcriptionConfidence * 100).toFixed(1)}%
                    </Badge>
                  )}
                  {msg.audioDurationSeconds && (
                    <Badge variant="outline">
                      {msg.audioDurationSeconds}s voice
                    </Badge>
                  )}
                  {msg.intent && (
                    <Badge variant="azure">
                      {msg.intent}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Error Fallback Banner */}
              {msg.isErrorFallback && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#991B1B',
                    fontSize: '0.8125rem',
                  }}
                >
                  <ShieldAlert size={16} />
                  <div>
                    <strong>Graceful Fallback Mode:</strong> {msg.errorReason}
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div
                style={{
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>

              {/* Verified Grounded Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <FileText size={14} color="#0078D4" />
                    <span>Grounded University Sources (Foundry IQ / Azure AI Search)</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {msg.citations.map((cite) => (
                      <button
                        key={cite.id}
                        onClick={() => setActiveCitation(cite)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.35rem 0.65rem',
                          background: '#EBF3FC',
                          border: '1px solid #C7E0F4',
                          borderRadius: '6px',
                          color: '#0078D4',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#D9E8F8')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#EBF3FC')}
                      >
                        <FileText size={12} />
                        <span>
                          {cite.docTitle} (p. {cite.pageNumber})
                        </span>
                        <ExternalLink size={10} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions / University Tools execution */}
              {msg.actions && msg.actions.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {msg.actions.map((act) => {
                    const isDone = !!executedActions[act.id];
                    return (
                      <button
                        key={act.id}
                        onClick={() => handleActionClick(act.id, act.title)}
                        className={`btn btn-sm ${isDone ? 'btn-secondary' : 'btn-primary'}`}
                        style={{
                          fontSize: '0.8125rem',
                          background: isDone ? '#ECFDF5' : '#0078D4',
                          borderColor: isDone ? '#A7F3D0' : '#0078D4',
                          color: isDone ? '#065F46' : '#FFFFFF',
                          gap: '6px',
                        }}
                      >
                        {isDone ? <CheckCircle2 size={14} /> : <Download size={14} />}
                        <span>{isDone ? `Executed: ${act.title}` : act.buttonText}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step-by-Step Telemetry Trace Accordion */}
              {msg.trace && msg.trace.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={() => toggleTrace(msg.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 0',
                    }}
                  >
                    <Activity size={13} color="#0078D4" />
                    <span>{isTraceOpen ? 'Hide Azure Orchestration Trace' : 'View Azure Telemetry Trace (5 Steps)'}</span>
                    {isTraceOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>

                  {isTraceOpen && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        backgroundColor: '#0F172A',
                        borderRadius: '8px',
                        padding: '0.875rem',
                        color: '#E2E8F0',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <div style={{ color: '#94A3B8', marginBottom: '0.5rem', fontWeight: 600 }}>
                        AZURE PIPELINE EXECUTION LOGS:
                      </div>
                      {msg.trace.map((t) => (
                        <div
                          key={t.step}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            padding: '4px 0',
                            borderBottom: '1px solid #1E293B',
                          }}
                        >
                          <span style={{ color: '#38BDF8', fontWeight: 600 }}>[{t.step}]</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#F1F5F9', fontWeight: 600 }}>{t.layer} — {t.azureService}</span>
                              <span style={{ color: '#34D399' }}>{t.latencyMs}ms</span>
                            </div>
                            <div style={{ color: '#94A3B8' }}>{t.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
