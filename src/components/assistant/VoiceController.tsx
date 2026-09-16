import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LANGUAGES } from '../../data/indianLanguages';
import { AudioVisualizer } from '../common/AudioVisualizer';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  RefreshCw,
  Radio,
  Sliders,
} from 'lucide-react';

export const VoiceController: React.FC = () => {
  const {
    selectedLanguage,
    setSelectedLanguageCode,
    voiceState,
    triggerVoiceQuerySimulation,
    resetConversation,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');

  const handleMicClick = () => {
    if (voiceState === 'idle') {
      triggerVoiceQuerySimulation();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    triggerVoiceQuerySimulation(inputText);
    setInputText('');
  };

  const isInteracting = voiceState !== 'idle';

  return (
    <div
      className="card"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: isInteracting ? '#0078D4' : '#E2E8F0',
        boxShadow: isInteracting ? '0 10px 25px -5px rgba(0, 120, 212, 0.15)' : 'var(--shadow-md)',
        transition: 'all 0.25s ease',
        padding: '2rem',
        marginBottom: '2rem',
        borderRadius: '16px',
      }}
    >
      {/* Top Header: Interaction Mode & Language Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor:
                voiceState === 'listening'
                  ? '#EF4444'
                  : voiceState === 'transcribing'
                  ? '#F59E0B'
                  : voiceState === 'reasoning'
                  ? '#8B5CF6'
                  : voiceState === 'speaking'
                  ? '#10B981'
                  : '#94A3B8',
              boxShadow: isInteracting ? '0 0 10px currentColor' : 'none',
            }}
          />
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {voiceState === 'idle'
              ? 'Voice Ready (Azure AI Speech)'
              : voiceState === 'listening'
              ? 'Listening to Student Speech...'
              : voiceState === 'transcribing'
              ? 'Azure Speech-to-Text Transcribing...'
              : voiceState === 'reasoning'
              ? 'Foundry Agent Reasoning & RAG Retrieval...'
              : 'Azure Neural TTS Speaking...'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className={`btn btn-sm ${inputMode === 'voice' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setInputMode('voice')}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <Mic size={13} />
            <span>Voice Mode</span>
          </button>
          <button
            className={`btn btn-sm ${inputMode === 'text' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setInputMode('text')}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <Sliders size={13} />
            <span>Text Mode</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={resetConversation}
            title="Reset Conversation"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <RefreshCw size={13} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Language Quick Selector Chips */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>SELECT INDIAN SPEECH LOCALE</span>
          <span style={{ color: '#0078D4', fontWeight: 500 }}>(Active Voice: {selectedLanguage.voiceActor})</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {INDIAN_LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage.code === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguageCode(lang.code)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid #0078D4' : '1px solid #E2E8F0',
                  background: isSelected ? '#EBF3FC' : '#F8FAFC',
                  color: isSelected ? '#0078D4' : '#475569',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{lang.nativeName}</span>
                <span style={{ fontSize: '0.6875rem', color: isSelected ? '#0078D4' : '#94A3B8' }}>
                  ({lang.name.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Voice Hub: Large Interactive Microphone & Audio Waveform */}
      {inputMode === 'voice' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 0 1rem 0',
            textAlign: 'center',
          }}
        >
          {/* Pulsing Mic Button */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            {isInteracting && (
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '50%',
                  border: '2px solid rgba(0, 120, 212, 0.4)',
                  animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />
            )}
            <button
              onClick={handleMicClick}
              disabled={isInteracting}
              aria-label="Activate Microphone"
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background:
                  voiceState === 'listening'
                    ? '#EF4444'
                    : voiceState === 'transcribing'
                    ? '#F59E0B'
                    : voiceState === 'reasoning'
                    ? '#8B5CF6'
                    : voiceState === 'speaking'
                    ? '#10B981'
                    : '#0078D4',
                color: '#FFFFFF',
                border: '4px solid #FFFFFF',
                boxShadow: '0 8px 20px rgba(0, 120, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isInteracting ? 'default' : 'pointer',
                transition: 'transform 0.15s ease, background 0.25s ease',
                transform: isInteracting ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={(e) => !isInteracting && (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => !isInteracting && (e.currentTarget.style.transform = 'scale(1)')}
            >
              {voiceState === 'speaking' ? (
                <Volume2 size={34} />
              ) : isInteracting ? (
                <Radio size={34} />
              ) : (
                <Mic size={34} />
              )}
            </button>
          </div>

          {/* Live Waveform Visualizer */}
          <div style={{ marginBottom: '1rem', width: '100%', maxWidth: '300px' }}>
            <AudioVisualizer
              isActive={isInteracting}
              mode={voiceState === 'listening' ? 'listening' : voiceState === 'speaking' ? 'speaking' : 'idle'}
              barColor={voiceState === 'listening' ? '#EF4444' : '#0078D4'}
              height={36}
            />
          </div>

          {/* Prompt Suggestion & Helper */}
          <div style={{ maxWidth: '640px' }}>
            <p style={{ fontSize: '0.875rem', color: '#1E293B', fontWeight: 500, marginBottom: '0.4rem' }}>
              {isInteracting ? (
                <span>
                  {voiceState === 'listening' && 'Listening to speech stream in ' + selectedLanguage.name + '...'}
                  {voiceState === 'transcribing' && 'Transcribing with Azure AI Speech (WER < 3.2%)...'}
                  {voiceState === 'reasoning' && 'Foundry Agent verifying grounded citations...'}
                  {voiceState === 'speaking' && 'Streaming response with Azure Neural Voice...'}
                </span>
              ) : (
                <span>Click the microphone to speak, or tap a sample query below:</span>
              )}
            </p>

            {!isInteracting && (
              <div
                onClick={() => triggerVoiceQuerySimulation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#F8FAFC',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '8px',
                  padding: '0.5rem 0.875rem',
                  fontSize: '0.8125rem',
                  color: '#0078D4',
                  cursor: 'pointer',
                  marginTop: '0.25rem',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#EBF3FC')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F8FAFC')}
              >
                <Sparkles size={14} />
                <span>Sample: "{selectedLanguage.samplePrompt}"</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Text Input Mode */
        <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type your university inquiry in ${selectedLanguage.name} or English...`}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontSize: '0.9375rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              outline: 'none',
              fontFamily: 'inherit',
            }}
            disabled={isInteracting}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!inputText.trim() || isInteracting}
            style={{ gap: '6px' }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
      )}
    </div>
  );
};
