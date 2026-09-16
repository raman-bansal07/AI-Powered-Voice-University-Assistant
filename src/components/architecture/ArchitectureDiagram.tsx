import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ARCHITECTURE_NODES, SAMPLE_TRACE_STEPS } from '../../data/architectureNodes';
import { ArchitectureNode } from '../../types/architecture';
import { Badge } from '../common/Badge';
import {
  User,
  Layout,
  Server,
  Mic,
  Cpu,
  Bot,
  Sparkles,
  Database,
  Layers,
  Search,
  FileText,
  Wrench,
  Zap,
  Globe,
  Volume2,
  Radio,
  Play,
  RotateCcw,
  Info,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const { setActiveArchitectureNode } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isPlayingTrace, setIsPlayingTrace] = useState<boolean>(false);

  // Playback timer
  useEffect(() => {
    let timer: number;
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
  const renderNodeBox = (
    nodeId: string,
    colorTheme: 'blue' | 'navy' | 'purple' | 'emerald' | 'amber' = 'blue'
  ) => {
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
          backgroundColor: isCurrentActiveInTrace ? '#FFFFFF' : '#FFFFFF',
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
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = themeStyles.border)}
        onMouseLeave={(e) => {
          if (!isCurrentActiveInTrace) e.currentTarget.style.borderColor = '#CBD5E1';
        }}
      >
        {/* Active Pulse Pill */}
        {isCurrentActiveInTrace && (
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '12px',
              backgroundColor: themeStyles.border,
              color: '#FFFFFF',
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF', animation: 'ping 1s infinite' }} />
            <span>STEP {currentStep.stepNumber}</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: themeStyles.iconBg,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {nodeId.includes('student') && <User size={16} />}
            {nodeId.includes('ui') && <Layout size={16} />}
            {nodeId.includes('backend') && <Server size={16} />}
            {nodeId.includes('stt') && <Mic size={16} />}
            {nodeId.includes('agent_layer') && <Cpu size={16} />}
            {nodeId.includes('foundry_agent') && <Bot size={16} />}
            {nodeId.includes('openai') && <Sparkles size={16} />}
            {nodeId.includes('rag_knowledge') && <Database size={16} />}
            {nodeId.includes('foundry_iq') && <Layers size={16} />}
            {nodeId.includes('search') && <Search size={16} />}
            {nodeId.includes('univ_documents') && <FileText size={16} />}
            {nodeId.includes('tools') && <Wrench size={16} />}
            {nodeId.includes('functions') && <Zap size={16} />}
            {nodeId.includes('university_apis') && <Globe size={16} />}
            {nodeId.includes('tts') && <Volume2 size={16} />}
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', lineHeight: 1.2 }}>
              {node.label}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{node.subtitle}</div>
          </div>
        </div>

        {node.azureService && (
          <div style={{ marginTop: '2px' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: '#EBF3FC',
                color: '#0078D4',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 600,
                border: '1px solid #C7E0F4',
              }}
            >
              {node.azureService}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Controller Bar: Trace Simulator */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.25rem 1.75rem',
          borderRadius: '12px',
        }}
      >
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#0078D4" />
            <span>Interactive Technical Architecture Flow Simulator</span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
            Preserving exact technical relationships across Client, Node.js Gateway, STT, Foundry Agent, RAG Search, Serverless Tools, and Neural TTS.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={isPlayingTrace ? resetTrace : startTrace}
            className={`btn ${isPlayingTrace ? 'btn-secondary' : 'btn-primary'}`}
            style={{ fontWeight: 600 }}
          >
            {isPlayingTrace ? <RotateCcw size={16} /> : <Play size={16} />}
            <span>{isPlayingTrace ? 'Reset Trace' : 'Trace a Voice Query Flow'}</span>
          </button>
          <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Info size={14} /> Click any node to view Azure specs & code
          </span>
        </div>
      </div>

      {/* Main Flowchart Visual Board */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative',
          overflowX: 'auto',
        }}
      >
        {/* Tier 1: Client Layer (Student -> Web/Mobile UI) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            1. Client & Ingestion Tier
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            {renderNodeBox('student', 'navy')}
            <div style={{ textAlign: 'center', color: '#0078D4', fontWeight: 600, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span>Microphone / Touch Streams (PCM Audio)</span>
              <ArrowRight size={18} />
            </div>
            {renderNodeBox('web_mobile_ui', 'blue')}
          </div>
        </div>

        {/* Transition to Backend Gateway */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 2.5rem 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#0078D4' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#EBF3FC', padding: '3px 10px', borderRadius: '4px' }}>
              WebSocket & REST Ingestion Pipeline
            </span>
            <ArrowDown size={22} />
          </div>
        </div>

        {/* Tier 2: Enterprise Node.js Backend Gateway */}
        <div style={{ marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', textAlign: 'center' }}>
            2. Gateway & Session Orchestration
          </div>
          {renderNodeBox('nodejs_backend', 'navy')}
        </div>

        {/* Split into 3 Parallel Layers */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748B', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>Dispatches into 3 Core Layers</span>
            <ArrowDown size={18} />
          </div>
        </div>

        {/* Tier 3: The Three Primary Layers (STT Layer, AI / Agent Layer, TTS Layer) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2.6fr 1.2fr',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Layer 1: STT Layer (Left Column) */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0078D4', textTransform: 'uppercase' }}>
              Layer A: STT Pipeline
            </div>
            {renderNodeBox('stt_layer', 'blue')}
            <div style={{ textAlign: 'center', color: '#0078D4' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>
            {renderNodeBox('azure_ai_speech_stt', 'blue')}
          </div>

          {/* Layer 2: AI / Agent Layer (Center Column) */}
          <div
            style={{
              backgroundColor: '#FAF5FF',
              border: '1px solid #E9D5FF',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6D28D9', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Layer B: Cognitive AI & Agent Reasoning</span>
              <span>ReAct Framework</span>
            </div>

            {renderNodeBox('ai_agent_layer', 'purple')}
            
            <div style={{ textAlign: 'center', color: '#7C3AED' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {renderNodeBox('microsoft_foundry_agent', 'purple')}

            {/* Azure OpenAI Powered Model Card */}
            <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px dashed #7C3AED' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6D28D9', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} />
                <span>Powered by Azure OpenAI / Foundry Models (GPT-4o)</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
                Strict groundedness system prompt, multi-lingual Indic tokens, and JSON function argument parser.
              </p>
            </div>

            {/* Sub-branches from Microsoft Foundry Agent: RAG vs Tools */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              {/* Branch 1: RAG / Knowledge */}
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0078D4', textTransform: 'uppercase' }}>
                  Branch 1: RAG & Knowledge
                </div>
                {renderNodeBox('rag_knowledge_branch', 'blue')}
                <div style={{ textAlign: 'center', color: '#0078D4' }}><ArrowDown size={14} style={{ margin: '0 auto' }} /></div>
                {renderNodeBox('foundry_iq', 'blue')}
                <div style={{ textAlign: 'center', color: '#0078D4' }}><ArrowDown size={14} style={{ margin: '0 auto' }} /></div>
                {renderNodeBox('azure_ai_search', 'blue')}
                <div style={{ textAlign: 'center', color: '#0078D4' }}><ArrowDown size={14} style={{ margin: '0 auto' }} /></div>
                {renderNodeBox('univ_documents_knowledge', 'navy')}
              </div>

              {/* Branch 2: Tools & Serverless Actions */}
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                  Branch 2: Tools & Actions
                </div>
                {renderNodeBox('tools_branch', 'emerald')}
                <div style={{ textAlign: 'center', color: '#059669' }}><ArrowDown size={14} style={{ margin: '0 auto' }} /></div>
                {renderNodeBox('azure_functions', 'emerald')}
                <div style={{ textAlign: 'center', color: '#059669' }}><ArrowDown size={14} style={{ margin: '0 auto' }} /></div>
                {renderNodeBox('university_apis', 'navy')}
              </div>
            </div>
          </div>

          {/* Layer 3: TTS Layer (Right Column) */}
          <div
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>
              Layer C: TTS Pipeline
            </div>
            {renderNodeBox('tts_layer', 'emerald')}
            <div style={{ textAlign: 'center', color: '#047857' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>
            {renderNodeBox('azure_ai_speech_tts', 'emerald')}
          </div>
        </div>
      </div>

      {/* Real-time Query Trace Telemetry Monitor Bar */}
      {currentStep && (
        <div
          className="card"
          style={{
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #334155',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  backgroundColor: '#0078D4',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                STEP {currentStep.stepNumber} OF {SAMPLE_TRACE_STEPS.length}
              </span>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' }}>
                {currentStep.title} — {currentStep.subtitle}
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8125rem' }}>
              <span style={{ color: '#38BDF8' }}>Service: {currentStep.azureService}</span>
              <span style={{ color: '#34D399' }}>Latency: {currentStep.latencyMs}ms</span>
            </div>
          </div>

          <p style={{ color: '#CBD5E1', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            {currentStep.actionSummary}
          </p>

          <div
            style={{
              backgroundColor: '#020617',
              borderRadius: '6px',
              padding: '0.625rem 0.875rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#F1F5F9',
              border: '1px solid #1E293B',
            }}
          >
            <span style={{ color: '#94A3B8' }}>Payload: </span>
            {currentStep.payloadPreview}
          </div>
        </div>
      )}
    </div>
  );
};
