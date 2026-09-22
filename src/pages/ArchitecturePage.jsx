import React, { useState } from 'react';
import { Layers, Mic, Cpu, Database, Server, Speech, Zap, Route } from 'lucide-react';

const ARCH_NODES = [
  { id: 'user', type: 'input', title: 'User Voice Input', desc: 'Any Indian Language', icon: <Mic size={20} color="#60A5FA" /> },
  
  { id: 'stt_sarvam', type: 'speech', title: 'Sarvam AI (STT)', desc: 'saaras:v3 model', icon: <Speech size={18} color="#34D399" /> },
  { id: 'stt_azure', type: 'speech_fallback', title: 'Azure Speech (STT)', desc: 'Fallback engine', icon: <Speech size={18} color="#F59E0B" /> },
  
  { id: 'router', type: 'logic', title: 'LLM Intent Router', desc: 'GPT-4.1-mini', icon: <Route size={20} color="#A78BFA" /> },
  
  { id: 'rag', type: 'data', title: 'Azure AI Search', desc: 'Semantic Hybrid Search', icon: <Database size={18} color="#F472B6" /> },
  { id: 'guardrail', type: 'data', title: 'Guardrail Filter', desc: 'Out-of-scope handler', icon: <Zap size={18} color="#EF4444" /> },
  
  { id: 'tts_sarvam', type: 'speech', title: 'Sarvam AI (TTS)', desc: 'bulbul:v3 model', icon: <Server size={18} color="#34D399" /> },
  { id: 'tts_azure', type: 'speech', title: 'Azure Speech (TTS)', desc: 'Neural Male Voices', icon: <Server size={18} color="#60A5FA" /> },
  
  { id: 'output', type: 'output', title: 'Voice Output', desc: 'In user\'s native language', icon: <Mic size={20} color="#E2E8F0" /> },
];

export const ArchitecturePage = () => {
  const [activePath, setActivePath] = useState('none'); // 'none', 'rag', 'guardrail'
  const [activeStep, setActiveStep] = useState(0); // 0 to 6
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = (path) => {
    if (isSimulating) return;
    setActivePath(path);
    setIsSimulating(true);
    setActiveStep(1);
    
    let step = 1;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= 6) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveStep(0);
          setActivePath('none');
        }, 3000);
      }
    }, 800);
  };

  const getGlow = (type, stepIndex) => {
    if (isSimulating && activeStep !== stepIndex) return 'transparent';
    if (!isSimulating && activePath === 'none') return 'transparent';
    
    switch(type) {
      case 'input': return 'rgba(96,165,250,0.15)';
      case 'speech': return 'rgba(52,211,153,0.1)';
      case 'speech_fallback': return 'rgba(245,158,11,0.1)';
      case 'logic': return 'rgba(167,139,250,0.15)';
      case 'data': return 'rgba(244,114,182,0.1)';
      case 'output': return 'rgba(226,232,240,0.1)';
      default: return 'transparent';
    }
  };

  const getBorder = (type, stepIndex) => {
    if (isSimulating && activeStep !== stepIndex) return 'rgba(255,255,255,0.05)';
    if (!isSimulating && activePath === 'none') return 'rgba(255,255,255,0.05)';

    switch(type) {
      case 'input': return 'rgba(96,165,250,0.4)';
      case 'speech': return 'rgba(52,211,153,0.3)';
      case 'speech_fallback': return 'rgba(245,158,11,0.3)';
      case 'logic': return 'rgba(167,139,250,0.4)';
      case 'data': return 'rgba(244,114,182,0.3)';
      case 'output': return 'rgba(226,232,240,0.3)';
      default: return 'transparent';
    }
  };

  const getOpacity = (stepIndex, specificPath) => {
    if (!isSimulating) {
      if (specificPath && activePath !== 'none' && activePath !== specificPath) return 0.2;
      return 1;
    }
    return activeStep >= stepIndex ? (specificPath && activePath !== specificPath ? 0.2 : 1) : 0.2;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030509',
      padding: '4rem 2rem',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#F8FAFC'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ 
            background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
            padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA',
            letterSpacing: '0.05em', textTransform: 'uppercase'
          }}>System Blueprint</span>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Technical Architecture
        </h1>
        <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 3rem', fontFamily: "'Inter', sans-serif" }}>
          A multi-provider orchestration system designed for zero-latency multilingual academic queries.
        </p>

        {/* Path Simulator Toggles */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <button 
            onClick={() => isSimulating ? null : startSimulation('rag')}
            disabled={isSimulating}
            style={{
              background: activePath === 'rag' ? 'rgba(52,211,153,0.1)' : 'transparent',
              border: `1px solid ${activePath === 'rag' ? '#34D399' : '#1E293B'}`,
              color: activePath === 'rag' ? '#34D399' : '#94A3B8',
              padding: '10px 20px', borderRadius: 8, cursor: isSimulating ? 'not-allowed' : 'pointer', fontWeight: 600, fontFamily: 'inherit'
            }}
          >
            {isSimulating && activePath === 'rag' ? 'Simulating...' : '▶ Simulate: RAG Query'}
          </button>
          <button 
            onClick={() => isSimulating ? null : startSimulation('guardrail')}
            disabled={isSimulating}
            style={{
              background: activePath === 'guardrail' ? 'rgba(239,68,68,0.1)' : 'transparent',
              border: `1px solid ${activePath === 'guardrail' ? '#EF4444' : '#1E293B'}`,
              color: activePath === 'guardrail' ? '#EF4444' : '#94A3B8',
              padding: '10px 20px', borderRadius: 8, cursor: isSimulating ? 'not-allowed' : 'pointer', fontWeight: 600, fontFamily: 'inherit'
            }}
          >
            {isSimulating && activePath === 'guardrail' ? 'Simulating...' : '▶ Simulate: Out-of-Scope Fallback'}
          </button>
        </div>

        {/* Tree Diagram */}
        <div style={{ position: 'relative', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Connector Line Base */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: '#1E293B', zIndex: 0, transform: 'translateX(-50%)' }} />

          {/* Level 1: Input */}
          <div style={{ zIndex: 10, width: 260, background: '#0B0F19', padding: '1rem', borderRadius: 16, border: `1px solid ${getBorder('input', 1)}`, boxShadow: `0 0 40px ${getGlow('input', 1)}`, opacity: getOpacity(1), transition: 'all 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              {ARCH_NODES[0].icon}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{ARCH_NODES[0].title}</div>
                <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[0].desc}</div>
              </div>
            </div>
          </div>

          {/* Level 2: STT Layer (Branching) */}
          <div style={{ display: 'flex', gap: '4rem', zIndex: 10, position: 'relative' }}>
            {/* Branch Lines */}
            <svg style={{ position: 'absolute', top: -56, left: 0, width: '100%', height: 56, pointerEvents: 'none', zIndex: 0 }}>
              <path d="M 50% 0 L 50% 20 L 25% 20 L 25% 56" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 50% 0 L 50% 20 L 75% 20 L 75% 56" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            
            <div style={{ width: 240, background: '#0B0F19', padding: '1rem', borderRadius: 16, border: `1px solid ${getBorder('speech', 2)}`, boxShadow: `0 0 30px ${getGlow('speech', 2)}`, opacity: getOpacity(2), transition: 'all 0.4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                {ARCH_NODES[1].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ARCH_NODES[1].title}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[1].desc}</div>
                </div>
              </div>
            </div>
            
            <div style={{ width: 240, background: '#0B0F19', padding: '1rem', borderRadius: 16, border: `1px solid ${getBorder('speech_fallback', 2)}`, opacity: getOpacity(2) * 0.7, transition: 'all 0.4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                {ARCH_NODES[2].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ARCH_NODES[2].title}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[2].desc}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 3: LLM Router */}
          <div style={{ zIndex: 10, width: 280, background: '#0B0F19', padding: '1.25rem', borderRadius: 16, border: `1px solid ${getBorder('logic', 3)}`, boxShadow: `0 0 50px ${getGlow('logic', 3)}`, opacity: getOpacity(3), transition: 'all 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              {ARCH_NODES[3].icon}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>{ARCH_NODES[3].title}</div>
                <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[3].desc}</div>
              </div>
            </div>
          </div>

          {/* Level 4: RAG vs Guardrail */}
          <div style={{ display: 'flex', gap: '6rem', zIndex: 10, position: 'relative' }}>
            <svg style={{ position: 'absolute', top: -56, left: 0, width: '100%', height: 56, pointerEvents: 'none', zIndex: 0 }}>
              <path d="M 50% 0 L 50% 20 L 20% 20 L 20% 56" fill="none" stroke={activePath === 'rag' ? '#34D399' : '#1E293B'} strokeWidth={activePath === 'rag' ? '3' : '2'} />
              <path d="M 50% 0 L 50% 20 L 80% 20 L 80% 56" fill="none" stroke={activePath === 'guardrail' ? '#EF4444' : '#1E293B'} strokeWidth={activePath === 'guardrail' ? '3' : '2'} />
            </svg>

            <div style={{ width: 240, background: '#0B0F19', padding: '1.25rem', borderRadius: 16, border: `1px solid ${activePath === 'rag' ? '#34D399' : getBorder('data', 4)}`, boxShadow: activePath === 'rag' ? `0 0 40px ${getGlow('data', 4)}` : 'none', opacity: getOpacity(4, 'rag'), transition: 'all 0.4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                {ARCH_NODES[4].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ARCH_NODES[4].title}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[4].desc}</div>
                </div>
              </div>
            </div>

            <div style={{ width: 240, background: '#0B0F19', padding: '1.25rem', borderRadius: 16, border: `1px solid ${activePath === 'guardrail' ? '#EF4444' : 'rgba(239,68,68,0.3)'}`, boxShadow: activePath === 'guardrail' ? '0 0 40px rgba(239,68,68,0.2)' : 'none', opacity: getOpacity(4, 'guardrail'), transition: 'all 0.4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                {ARCH_NODES[5].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ARCH_NODES[5].title}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[5].desc}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 5: TTS */}
          <div style={{ display: 'flex', gap: '2rem', zIndex: 10, background: '#0B0F19', padding: '1.5rem', borderRadius: 16, border: `1px solid ${getBorder('speech', 5)}`, boxShadow: `0 0 30px ${getGlow('speech', 5)}`, opacity: getOpacity(5), transition: 'all 0.4s ease', marginTop: '1rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {ARCH_NODES[6].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ARCH_NODES[6].title}</div>
                  <div style={{ color: '#64748B', fontSize: '0.7rem' }}>{ARCH_NODES[6].desc}</div>
                </div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {ARCH_NODES[7].icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ARCH_NODES[7].title}</div>
                  <div style={{ color: '#64748B', fontSize: '0.7rem' }}>{ARCH_NODES[7].desc}</div>
                </div>
              </div>
          </div>

          {/* Level 6: Output */}
          <div style={{ zIndex: 10, width: 260, background: '#0B0F19', padding: '1.25rem', borderRadius: 16, border: `1px solid ${getBorder('output', 6)}`, boxShadow: `0 0 50px ${getGlow('output', 6)}`, opacity: getOpacity(6), transition: 'all 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              {ARCH_NODES[8].icon}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>{ARCH_NODES[8].title}</div>
                <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{ARCH_NODES[8].desc}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
