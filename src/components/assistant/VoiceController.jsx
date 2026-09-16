import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LANGUAGES } from '../../data/indianLanguages';
import { AudioVisualizer } from '../common/AudioVisualizer';
import {
  Mic,
  Send,
  Sparkles,
  Volume2,
  RefreshCw,
  Sliders,
} from 'lucide-react';

export const VoiceController = () => {
  const {
    selectedLanguage,
    setSelectedLanguageCode,
    voiceState,
    triggerVoiceQuerySimulation,
    resetConversation,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('voice');

  const handleMicClick = () => {
    if (voiceState === 'idle') {
      triggerVoiceQuerySimulation();
    }
  };

  const handleTextSubmit = (e) => {
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
              ? 'Azure OpenAI Reasoning & RAG Retrieval...'
              : 'Azure Neural TTS Speaking...'}
          </span>
        </div>

        {/* Mode Toggle & Clear Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setInputMode(inputMode === 'voice' ? 'text' : 'voice')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
          >
            <Sliders size={13} />
            <span>Switch to {inputMode === 'voice' ? 'Text Input' : 'Voice Mode'}</span>
          </button>

          <button
            onClick={resetConversation}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
            title="Reset Conversation"
          >
            <RefreshCw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Language Quick-Select Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', marginBottom: '0.5rem' }}>
          SELECT RECOGNITION DIALECT:
        </div>
        <div
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {INDIAN_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguageCode(lang.code)}
              className="btn btn-sm"
              style={{
                background: selectedLanguage.code === lang.code ? '#0078D4' : '#F1F5F9',
                color: selectedLanguage.code === lang.code ? '#FFFFFF' : '#334155',
                border: 'none',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: selectedLanguage.code === lang.code ? 700 : 500,
                flexShrink: 0,
              }}
            >
              <span>{lang.name}</span>
              <span style={{ opacity: 0.7, fontSize: '0.7rem' }}>({lang.nativeName})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Center Stage: Voice Orb or Text Input */}
      {inputMode === 'voice' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 0',
          }}
        >
          {/* Animated Microphone Button */}
          <button
            onClick={handleMicClick}
            disabled={isInteracting}
            aria-label="Click to start speech query"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: 'none',
              background:
                voiceState === 'listening'
                  ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                  : voiceState === 'transcribing'
                  ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                  : voiceState === 'reasoning'
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
                  : voiceState === 'speaking'
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : 'var(--azure-gradient)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isInteracting ? 'default' : 'pointer',
              boxShadow: isInteracting
                ? '0 0 35px rgba(0, 120, 212, 0.45)'
                : '0 8px 24px rgba(0, 120, 212, 0.3)',
              transform: isInteracting ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              marginBottom: '1.25rem',
            }}
          >
            {voiceState === 'speaking' ? (
              <Volume2 size={40} className="animate-pulse" />
            ) : isInteracting ? (
              <Sparkles size={40} className="animate-spin" />
            ) : (
              <Mic size={40} />
            )}
          </button>

          {/* Audio Visualizer Strip */}
          <div style={{ width: '100%', maxWidth: '320px', marginBottom: '1rem' }}>
            <AudioVisualizer
              isActive={isInteracting}
              color={
                voiceState === 'listening'
                  ? '#EF4444'
                  : voiceState === 'reasoning'
                  ? '#8B5CF6'
                  : voiceState === 'speaking'
                  ? '#10B981'
                  : '#0078D4'
              }
              height={32}
            />
          </div>

          {/* Current Status / Hint */}
          <div style={{ textAlign: 'center', maxWidth: '460px' }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.25rem' }}>
              {isInteracting
                ? `Processing ${selectedLanguage.name} Voice Stream...`
                : `Tap Mic to ask in ${selectedLanguage.name}`}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Sample: "{selectedLanguage.samplePrompt}"
            </div>
          </div>
        </div>
      ) : (
        /* Text Input Form */
        <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask about exam dates, attendance rules, or ordinances in ${selectedLanguage.name}...`}
            disabled={isInteracting}
            style={{ flex: 1, padding: '0.75rem 1rem' }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isInteracting || !inputText.trim()}
          >
            <Send size={16} />
            <span>Ask</span>
          </button>
        </form>
      )}
    </div>
  );
};
