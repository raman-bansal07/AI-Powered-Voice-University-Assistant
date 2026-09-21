import React, { useState, useRef } from 'react';
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
  Sliders,
  Zap,
  Cloud,
} from 'lucide-react';

export const VoiceController = () => {
  const {
    selectedLanguage,
    setSelectedLanguageCode,
    voiceState,
    setVoiceState,
    triggerVoiceQuerySimulation,
    processVoiceAudio,
    resetConversation,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState(null);

  // Provider Modal state
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [pendingAudioBlob, setPendingAudioBlob] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleMicClick = async () => {
    // If already recording → stop
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    // If system is processing a previous query → ignore
    if (voiceState !== 'idle') return;

    setMicError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick a supported MIME type
      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus']
        .find((t) => MediaRecorder.isTypeSupported(t)) || '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        // Stop all microphone tracks
        stream.getTracks().forEach((t) => t.stop());

        const audioBlob = new Blob(audioChunksRef.current, {
          type: mimeType || 'audio/webm',
        });
        audioChunksRef.current = [];

        // Store blob and show provider selection modal
        setPendingAudioBlob(audioBlob);
        setSelectedProvider(null);
        setShowProviderModal(true);
        setVoiceState('idle'); // reset while modal is open
      };

      recorder.start();
      setIsRecording(true);
      setVoiceState('listening');
    } catch (err) {
      console.error('Mic access error:', err);
      setMicError(
        err.name === 'NotAllowedError'
          ? 'Microphone permission denied. Please allow microphone access in your browser settings.'
          : `Could not access microphone: ${err.message}`
      );
    }
  };

  const handleProviderSelect = async (provider) => {
    setShowProviderModal(false);
    setSelectedProvider(provider);
    if (pendingAudioBlob) {
      await processVoiceAudio(pendingAudioBlob, provider);
      setPendingAudioBlob(null);
    }
  };

  const handleModalClose = () => {
    setShowProviderModal(false);
    setPendingAudioBlob(null);
    setVoiceState('idle');
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    triggerVoiceQuerySimulation(inputText);
    setInputText('');
  };

  const isInteracting = voiceState !== 'idle' || isRecording;

  // Mic button color
  const micBg =
    isRecording
      ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'  // red = recording
      : voiceState === 'transcribing'
      ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
      : voiceState === 'reasoning'
      ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
      : voiceState === 'speaking'
      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
      : 'var(--azure-gradient)';

  // Status label
  const statusLabel = isRecording
    ? `Recording ${selectedLanguage.name}... Click mic to stop`
    : voiceState === 'transcribing'
    ? 'Transcribing with Sarvam saaras:v3...'
    : voiceState === 'reasoning'
    ? 'Azure OpenAI Reasoning & RAG Retrieval...'
    : voiceState === 'speaking'
    ? `Speaking via ${selectedProvider === 'azure' ? 'Azure Neural TTS' : 'Sarvam bulbul:v3'}...`
    : 'Voice Ready (Azure AI Speech)';

  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: isInteracting ? 'var(--border-blue)' : 'var(--border)',
        boxShadow: isInteracting ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
        transition: 'all 0.25s ease',
        padding: '2rem',
        marginBottom: '2rem',
        borderRadius: '16px',
        position: 'relative',
      }}
    >
      {/* Top Header */}
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
                isRecording
                  ? '#EF4444'
                  : voiceState === 'transcribing'
                  ? '#F59E0B'
                  : voiceState === 'reasoning'
                  ? '#8B5CF6'
                  : voiceState === 'speaking'
                  ? '#10B981'
                  : '#3B4570',
              boxShadow: isInteracting ? '0 0 10px currentColor' : 'none',
              animation: isRecording ? 'pulse 1s infinite' : 'none',
            }}
          />
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {statusLabel}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setInputMode(inputMode === 'voice' ? 'text' : 'voice')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
            disabled={isRecording}
          >
            <Sliders size={13} />
            <span>Switch to {inputMode === 'voice' ? 'Text Input' : 'Voice Mode'}</span>
          </button>

          <button
            onClick={resetConversation}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
            title="Reset Conversation"
            disabled={isRecording}
          >
            <RefreshCw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Language Dropdown */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          Language
        </label>
        <select
          value={selectedLanguage.code}
          onChange={(e) => setSelectedLanguageCode(e.target.value)}
          disabled={isRecording || voiceState !== 'idle'}
          style={{
            flex: 1, padding: '0.45rem 0.8rem',
            background: 'var(--bg-muted)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-blue)',
            borderRadius: 9, fontSize: '0.875rem',
            fontWeight: 600, fontFamily: 'var(--font-sans)',
            cursor: 'pointer', outline: 'none',
            opacity: (isRecording || voiceState !== 'idle') ? 0.5 : 1,
          }}
        >
          {INDIAN_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}  ({lang.nativeName})
            </option>
          ))}
        </select>
      </div>

      {/* Main Stage: Voice Orb or Text Input */}
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
          {/* Microphone Button */}
          <button
            onClick={handleMicClick}
            disabled={voiceState !== 'idle' && !isRecording}
            aria-label={isRecording ? 'Click to stop recording' : 'Click to start speech query'}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: isRecording ? '4px solid rgba(255,255,255,0.6)' : 'none',
              background: micBg,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (voiceState !== 'idle' && !isRecording) ? 'default' : 'pointer',
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
            ) : voiceState === 'transcribing' || voiceState === 'reasoning' ? (
              <Sparkles size={40} className="animate-spin" />
            ) : isRecording ? (
              <MicOff size={40} />
            ) : (
              <Mic size={40} />
            )}
          </button>

          {/* Audio Visualizer */}
          <div style={{ width: '100%', maxWidth: '320px', marginBottom: '1rem' }}>
            <AudioVisualizer
              isActive={isInteracting}
              color={
                isRecording
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

          {/* Status / Hint */}
          <div style={{ textAlign: 'center', maxWidth: '460px' }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {isRecording
                ? `Recording in ${selectedLanguage.name} — Click mic to stop & send`
                : voiceState !== 'idle'
                ? `Processing ${selectedLanguage.name} Voice Stream...`
                : `Tap Mic to ask in ${selectedLanguage.name}`}
            </div>
            {!isRecording && voiceState === 'idle' && (
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Sample: "{selectedLanguage.samplePrompt}"
              </div>
            )}
          </div>

          {/* Mic error message */}
          {micError && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                fontSize: '0.8125rem',
                maxWidth: '400px',
                textAlign: 'center',
              }}
            >
              {micError}
            </div>
          )}
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

      {/* ===================== PROVIDER SELECTION MODAL ===================== */}
      {showProviderModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(5, 8, 16, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={handleModalClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #0F1B35 0%, #1A2C50 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              maxWidth: '440px',
              width: '90%',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,120,212,0.2)',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: 56, height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0078D4, #00BCF2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 0 24px rgba(0,120,212,0.4)',
              }}>
                <Volume2 size={26} color="#fff" />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Choose Voice Engine
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Select which AI will respond to your voice query.
                <br />Your speech has been captured successfully!
              </p>
            </div>

            {/* Provider Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {/* Sarvam AI Button */}
              <button
                id="provider-sarvam-btn"
                onClick={() => handleProviderSelect('sarvam')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(109,40,217,0.3))',
                  border: '1px solid rgba(139,92,246,0.5)',
                  borderRadius: '14px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(109,40,217,0.45))'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(109,40,217,0.3))'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Zap size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                    Sarvam AI  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>bulbul:v3</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                    Indian languages specialist · Female voice
                  </div>
                </div>
              </button>

              {/* Azure AI Speech Button */}
              <button
                id="provider-azure-btn"
                onClick={() => handleProviderSelect('azure')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'linear-gradient(135deg, rgba(0,120,212,0.2), rgba(0,188,242,0.3))',
                  border: '1px solid rgba(0,120,212,0.5)',
                  borderRadius: '14px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,120,212,0.35), rgba(0,188,242,0.45))'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,120,212,0.2), rgba(0,188,242,0.3))'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #0078D4, #00BCF2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Cloud size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                    Azure AI Speech  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>Neural TTS</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                    Microsoft Azure · Male neural voice · Fallback engine
                  </div>
                </div>
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={handleModalClose}
              style={{
                display: 'block', width: '100%', marginTop: '1rem',
                padding: '0.6rem', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
                color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              Cancel — Discard Recording
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
};
