import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ARCHITECTURE_NODES, SAMPLE_TRACE_STEPS } from '../../data/architectureNodes';
import { Badge } from '../common/Badge';
import {
  User,
  Layout,
  Server,
  Mic,
  Cpu,
  Sparkles,
  Database,
  Search,
  FileText,
  Volume2,
  Play,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react';

export const ArchitectureDiagram = () => {
  const { setActiveArchitectureNode } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [isPlayingTrace, setIsPlayingTrace] = useState(false);

  // Playback timer
  useEffect(() => {
    let timer;
    if (isPlayingTrace) {
      timer = window.setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev === null || prev >= SAMPLE_TRACE_STEPS.length - 1) {
            setIsPlayingTrace(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlayingTrace]);

  const startTrace = () => {
    setActiveStepIndex(0);
    setIsPlayingTrace(true);
  };

  const resetTrace = () => {
    setIsPlayingTrace(false);
    setActiveStepIndex(null);
  };

  const currentStep = activeStepIndex !== null ? SAMPLE_TRACE_STEPS[activeStepIndex] : null;

  // Helper to render an architecture node box
  const renderNodeBox = (nodeId, colorTheme = 'blue') => {
    const node = ARCHITECTURE_NODES[nodeId];
    if (!node) return null;

    const isCurrentActiveInTrace = currentStep?.nodeId === nodeId;

    const themeStyles = {
      blue: { border: '#0078D4', bg: '#F0F7FF', iconBg: '#0078D4', text: '#0078D4' },
      navy: { border: '#0B192C', bg: '#F8FAFC', iconBg: '#0B192C', text: '#0F172A' },
      purple: { border: '#7C3AED', bg: '#FAF5FF', iconBg: '#7C3AED', text: '#6D28D9' },
      emerald: { border: '#059669', bg: '#ECFDF5', iconBg: '#059669', text: '#047857' },
      amber: { border: '#D97706', bg: '#FFFBEB', iconBg: '#D97706', text: '#B45309' },
    }[colorTheme];

    return (
      <div
        onClick={() => setActiveArchitectureNode(node)}
        style={{
          backgroundColor: '#FFFFFF',
          border: isCurrentActiveInTrace
            ? `2px solid ${themeStyles.border}`
            : '1px solid #CBD5E1',
          borderRadius: '10px',
          padding: '1rem',
          boxShadow: isCurrentActiveInTrace
            ? `0 0 0 4px rgba(0, 120, 212, 0.2), 0 8px 16px rgba(0,0,0,0.08)`
            : 'var(--shadow-sm)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {isCurrentActiveInTrace && (
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '12px',
              backgroundColor: '#0078D4',
              color: '#FFFFFF',
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '20px',
            }}
          >
            ACTIVE TRACE STEP {currentStep.stepNumber}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: themeStyles.bg,
                color: themeStyles.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {node.iconName === 'User' && <User size={18} />}
              {node.iconName === 'Layout' && <Layout size={18} />}
              {node.iconName === 'Server' && <Server size={18} />}
              {node.iconName === 'Mic' && <Mic size={18} />}
              {node.iconName === 'Cpu' && <Cpu size={18} />}
              {node.iconName === 'Sparkles' && <Sparkles size={18} />}
              {node.iconName === 'Database' && <Database size={18} />}
              {node.iconName === 'Search' && <Search size={18} />}
              {node.iconName === 'FileText' && <FileText size={18} />}
              {node.iconName === 'Volume2' && <Volume2 size={18} />}
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                {node.label}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                {node.subtitle}
              </div>
            </div>
          </div>

          <span className="badge" style={{ fontSize: '0.6875rem' }}>
            {node.latencySla}
          </span>
        </div>

        {node.azureService && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0078D4' }}>
              ✦ {node.azureService}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="card"
      style={{
        padding: '1.75rem',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Top Controls: Interactive Simulation Player */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A' }}>
            End-to-End Architecture Flow
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>
            Click any node below to inspect parameters, or play the live audio query simulation.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={isPlayingTrace ? () => setIsPlayingTrace(false) : startTrace}
            className="btn btn-primary btn-sm"
          >
            <Play size={14} />
            <span>{isPlayingTrace ? 'Pause Simulation' : 'Simulate Query Flow'}</span>
          </button>

          <button
            onClick={resetTrace}
            className="btn btn-secondary btn-sm"
            title="Reset Simulation"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Active Step Telemetry Banner */}
      {currentStep && (
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span className="badge badge-azure" style={{ fontSize: '0.6875rem' }}>
                STEP {currentStep.stepNumber} OF {SAMPLE_TRACE_STEPS.length}
              </span>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#38BDF8' }}>
                {currentStep.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                ({currentStep.azureService})
              </span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#CBD5E1' }}>
              {currentStep.actionSummary}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#34D399' }}>
              {currentStep.latencyMs}ms
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Step Latency</div>
          </div>
        </div>
      )}

      {/* Visual Pipeline Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Layer 1: Client & Ingestion */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            LAYER 1: CLIENT & INGESTION
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {renderNodeBox('student', 'navy')}
            {renderNodeBox('web_mobile_ui', 'blue')}
            {renderNodeBox('nodejs_backend', 'navy')}
          </div>
        </div>

        {/* Layer 2: Speech & AI Reasoning */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            LAYER 2: SPEECH & COGNITIVE REASONING
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {renderNodeBox('azure_ai_speech_stt', 'blue')}
            {renderNodeBox('azure_openai_models', 'purple')}
            {renderNodeBox('azure_ai_speech_tts', 'blue')}
          </div>
        </div>

        {/* Layer 3: Grounded RAG Knowledge Base */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            LAYER 3: GROUNDED RAG KNOWLEDGE BASE
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {renderNodeBox('azure_ai_search', 'emerald')}
            {renderNodeBox('univ_documents_knowledge', 'emerald')}
          </div>
        </div>
      </div>
    </div>
  );
};
