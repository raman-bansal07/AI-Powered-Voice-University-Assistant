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

  const triggerVoiceQuerySimulation = (customPrompt, customLang) => {
    const lang = customLang
      ? INDIAN_LANGUAGES.find((l) => l.code === customLang) || selectedLanguage
      : selectedLanguage;

    const queryText = customPrompt || lang.samplePrompt;

    // Step 1: Listening
    setVoiceState('listening');

    setTimeout(() => {
      // Step 2: Transcribing (STT)
      setVoiceState('transcribing');

      setTimeout(() => {
        // Step 3: Add user message to conversation
        const userMsg = {
          id: `msg-${Date.now()}-user`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: lang.code,
          text: queryText,
          audioDurationSeconds: 4.5,
          transcriptionConfidence: 0.988,
        };
        addMessage(userMsg);

        // Step 4: Reasoning (Azure OpenAI + RAG)
        setVoiceState('reasoning');

        setTimeout(() => {
          // Handle Fallback modes if active
          let assistantMsg;

          if (fallbackMode === 'stt_low_snr') {
            assistantMsg = {
              id: `msg-${Date.now()}-ast`,
              sender: 'assistant',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language: lang.code,
              text: 'I could not clearly understand the audio input due to low signal-to-noise ratio. Please speak closer to your microphone or switch to text input mode.',
              isErrorFallback: true,
              errorReason: 'Azure AI Speech: Confidence Score < 0.60 (Acoustic Clipping)',
            };
          } else if (fallbackMode === 'rag_out_of_bounds') {
            assistantMsg = {
              id: `msg-${Date.now()}-ast`,
              sender: 'assistant',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language: lang.code,
              text: 'I am sorry, but that inquiry falls outside official university regulations and verified documentation. I am programmed to only provide answers grounded in verified university sources.',
              isErrorFallback: true,
              errorReason: 'Azure AI Search Guardrail: Cosine Similarity < 0.70 threshold across all indices.',
            };
          } else if (fallbackMode === 'functions_timeout') {
            assistantMsg = {
              id: `msg-${Date.now()}-ast`,
              sender: 'assistant',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language: lang.code,
              text: 'The university database is currently experiencing high load. Your general inquiry has been noted; please retry shortly.',
              isErrorFallback: true,
              errorReason: 'Azure Gateway: Request timeout from university backend endpoint.',
            };
          } else if (fallbackMode === 'entra_unauthorized' && userRole === 'guest') {
            assistantMsg = {
              id: `msg-${Date.now()}-ast`,
              sender: 'assistant',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language: lang.code,
              text: 'Access Denied: This inquiry requests private student grade and fee records. Please authenticate with your university Microsoft Entra ID student account to access protected data.',
              isErrorFallback: true,
              errorReason: 'Microsoft Entra ID: Missing "Student.Enrolled" OAuth2 claim.',
            };
          } else {
            // Normal grounded answer
            assistantMsg = {
              id: `msg-${Date.now()}-ast`,
              sender: 'assistant',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language: lang.code,
              text:
                lang.code === 'hi'
                  ? `विश्वविद्यालय शैक्षणिक नियम (अधिनियम 14.3) के अनुसार, परीक्षा में उपस्थित होने के लिए **75% उपस्थिति** अनिवार्य है। अस्पताल के वैध प्रमाण पत्र के साथ **10% छूट (न्यूनतम 65%)** मान्य है।`
                  : lang.code === 'ta'
                  ? `பல்கலைக்கழக விதிமுறைகளின்படி (விதி 14.3), இறுதித் தேர்வெழுத **75% வருகை** கட்டாயமாகும். மருத்துவ காரணங்களுக்காக **10% வரை தளர்வு (குறைந்தபட்சம் 65%)** அனுமதிக்கப்படும்.`
                  : lang.code === 'te'
                  ? `విశ్వవిద్యాలయ విద్యా నిబంధనల ప్రకారం (ఆర్డినెన్స్ 14.3), పరీక్షలకు హాజరు కావడానికి **75% హాజరు** తప్పనిసరి. వైద్య కారణాలపై **10% వరకు సడలింపు (కనీసం 65%)** అనుమతించబడుతుంది.`
                  : `According to **University Academic Regulations (Ordinance 14.3)**, a minimum of **75% attendance** across all courses is mandatory. A condonation of up to **10% (threshold lowered to 65%)** is granted on medical grounds with valid hospital documentation.`,
              audioDurationSeconds: 6.8,
              intent: 'academics.general_regulation',
              citations: [
                {
                  id: `cite-${Date.now()}`,
                  docTitle: 'University_Academic_Regulations_2024_2026.pdf',
                  category: 'University Policies',
                  section: 'Ordinance 14.3: Attendance & Examination Eligibility',
                  pageNumber: 34,
                  confidence: 0.965,
                  snippet:
                    'Every candidate registered for a degree program shall maintain a minimum of 75% attendance. Condonation up to 10% sanctioned on verified medical grounds.',
                  fileType: 'Handbook',
                  accessLevel: 'public',
                  azureSearchScore: 0.958,
                },
              ],
              actions: [
                {
                  id: `act-${Date.now()}`,
                  type: 'api_call',
                  title: 'Verify Student Attendance Status',
                  description: 'Calculates real-time attendance across registered courses.',
                  endpoint: '/api/v1/tools/attendance-check',
                  payloadSummary: '{ role: "STUDENT", minThreshold: 75 }',
                  status: 'available',
                  buttonText: 'Check My Current Attendance',
                },
              ],
              trace: [
                {
                  step: 1,
                  layer: 'STT',
                  azureService: `Azure AI Speech (${lang.locale})`,
                  latencyMs: 135,
                  detail: `Transcribed audio to ${lang.name} with 98.8% confidence.`,
                  status: 'completed',
                },
                {
                  step: 2,
                  layer: 'Agent Reasoning',
                  azureService: 'Azure OpenAI (GPT-4o)',
                  latencyMs: 172,
                  detail: 'Parsed query intent and entity rules. Dispatched RAG search vector.',
                  status: 'completed',
                },
                {
                  step: 3,
                  layer: 'RAG Retrieval',
                  azureService: 'Azure AI Search',
                  latencyMs: 78,
                  detail: 'Retrieved top chunk from "univ-academic-regulations" with cosine score 0.958.',
                  status: 'completed',
                },
                {
                  step: 4,
                  layer: 'TTS Synthesis',
                  azureService: `Azure AI Speech (${lang.voiceName})`,
                  latencyMs: 104,
                  detail: `Synthesized speech using ${lang.voiceActor}.`,
                  status: 'completed',
                },
              ],
            };
          }

          addMessage(assistantMsg);
          setVoiceState('speaking');
          setIsPlayingAudio(true);
          setPlaybackAudioText(assistantMsg.text);

          setTimeout(() => {
            setVoiceState('idle');
            setIsPlayingAudio(false);
          }, 3500);
        }, 1200);
      }, 1000);
    }, 1200);
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
