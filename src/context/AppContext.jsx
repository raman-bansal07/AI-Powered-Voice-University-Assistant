import React, { createContext, useContext, useState, useEffect } from 'react';
import { INDIAN_LANGUAGES } from '../data/indianLanguages';
import { INITIAL_CONVERSATION } from '../data/mockConversations';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('about');
  const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[0]);
  const [voiceState, setVoiceState] = useState('idle');
  const [userRole, setUserRole] = useState('student');
  const [fallbackMode, setFallbackMode] = useState('none');
  const [messages, setMessages] = useState(INITIAL_CONVERSATION);
  const [activeCitation, setActiveCitation] = useState(null);
  const [activeArchitectureNode, setActiveArchitectureNode] = useState(null);
  const [activeKnowledgeDoc, setActiveKnowledgeDoc] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackAudioText, setPlaybackAudioText] = useState(null);

  // Sync hash with route if available
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validRoutes = ['about', 'assistant', 'architecture', 'knowledge', 'technology', 'security', 'team'];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedLanguageCode = (code) => {
    const found = INDIAN_LANGUAGES.find((l) => l.code === code) || INDIAN_LANGUAGES[0];
    setSelectedLanguage(found);
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const resetConversation = () => {
    setMessages(INITIAL_CONVERSATION);
    setVoiceState('idle');
    setIsPlayingAudio(false);
  };

  const BACKEND_URL = ''; // Vite proxy forwards /api -> http://localhost:8000

  // Play base64 audio from Sarvam TTS
  const playAudioFromBase64 = (base64Audio) => {
    try {
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play().catch(() => {});
      audio.onended = () => {
        setIsPlayingAudio(false);
        setVoiceState('idle');
        URL.revokeObjectURL(url);
      };
    } catch {
      setIsPlayingAudio(false);
      setVoiceState('idle');
    }
  };

  const triggerVoiceQuerySimulation = async (customPrompt, customLang) => {
    const lang = customLang
      ? INDIAN_LANGUAGES.find((l) => l.code === customLang) || selectedLanguage
      : selectedLanguage;

    const queryText = customPrompt || lang.samplePrompt;

    // Step 1: Listening state
    setVoiceState('listening');

    setTimeout(async () => {
      // Step 2: Transcribing state
      setVoiceState('transcribing');

      // Add user message immediately
      const userMsg = {
        id: `msg-${Date.now()}-user`,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang.code,
        text: queryText,
        audioDurationSeconds: 3.5,
        transcriptionConfidence: 0.985,
      };
      addMessage(userMsg);

      // Step 3: Reasoning state — call real backend
      setVoiceState('reasoning');

      try {
        const response = await fetch(`${BACKEND_URL}/api/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: queryText,
            language_code: lang.code,
            user_role: userRole,
            generate_audio: true,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw {
            type: errData.error_type || 'BackendError',
            message: errData.message || `Backend returned HTTP ${response.status}`,
            subsystem: errData.subsystem || 'FastAPI',
            path: errData.path || '/api/chat/message',
          };
        }

        const data = await response.json();

        const assistantMsg = {
          id: `msg-${Date.now()}-ast`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: lang.code,
          text: data.response_text,
          isOutOfScope: data.is_out_of_scope,
          toolUsed: data.tool_used,
          citations: (data.citations || []).map((c, i) => ({
            id: `cite-${Date.now()}-${i}`,
            docTitle: c.title,
            category: c.source_type,
            section: c.section,
            confidence: c.relevance_score || 0.92,
            accessLevel: 'public',
          })),
          trace: [
            { step: 1, layer: 'STT', azureService: `Sarvam saaras:v2 (${lang.code})`, latencyMs: data.telemetry?.stt?.status_code === 200 ? 140 : 0, detail: `Transcribed to ${lang.name}`, status: 'completed' },
            { step: 2, layer: 'Intent Guardrail', azureService: 'Intent Router', latencyMs: 2, detail: data.telemetry?.guardrail?.guardrail_status || 'PASSED_IN_SCOPE', status: 'completed' },
            { step: 3, layer: 'Tool / RAG', azureService: data.tool_used || 'RAG Ordinances', latencyMs: 10, detail: `Tool: ${data.tool_used || 'RAG Retrieval'}`, status: 'completed' },
            { step: 4, layer: 'TTS Synthesis', azureService: `Sarvam bulbul:v2 (${lang.code})`, latencyMs: data.telemetry?.tts?.status_code === 200 ? 180 : 0, detail: `Voice synthesized in ${lang.name}`, status: 'completed' },
          ],
          telemetry: data.telemetry,
        };

        addMessage(assistantMsg);
        setVoiceState('speaking');
        setIsPlayingAudio(true);
        setPlaybackAudioText(data.response_text);

        if (data.audio_base64) {
          playAudioFromBase64(data.audio_base64);
        } else {
          setTimeout(() => {
            setVoiceState('idle');
            setIsPlayingAudio(false);
          }, 3000);
        }

      } catch (err) {
        // Show structured error card in conversation feed
        const isStructuredError = err && err.type;
        const assistantMsg = {
          id: `msg-${Date.now()}-err`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: lang.code,
          text: isStructuredError
            ? `Unable to process request: ${err.message}`
            : 'The university assistant backend is currently unreachable. Please ensure the FastAPI server is running at localhost:8000.',
          isErrorFallback: true,
          errorReason: isStructuredError
            ? `${err.type} — ${err.subsystem || 'Backend'}: ${err.message}`
            : `Network Error: Cannot connect to http://localhost:8000 — start the backend with: python run.py`,
          errorType: err?.type || 'NetworkError',
          errorSubsystem: err?.subsystem || 'FastAPI Gateway',
        };
        addMessage(assistantMsg);
        setVoiceState('idle');
        setIsPlayingAudio(false);
      }
    }, 900);
  };


  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        selectedLanguage,
        setSelectedLanguageCode,
        voiceState,
        setVoiceState,
        userRole,
        setUserRole,
        fallbackMode,
        setFallbackMode,
        messages,
        addMessage,
        resetConversation,
        activeCitation,
        setActiveCitation,
        activeArchitectureNode,
        setActiveArchitectureNode,
        activeKnowledgeDoc,
        setActiveKnowledgeDoc,
        isPlayingAudio,
        setIsPlayingAudio,
        playbackAudioText,
        setPlaybackAudioText,
        triggerVoiceQuerySimulation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
