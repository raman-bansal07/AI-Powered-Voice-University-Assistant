import React, { createContext, useContext, useState, useEffect } from 'react';
import { IndianLanguage, LanguageCode, Message, UserRole, VoiceState, FallbackMode, Citation } from '../types/assistant';
import { INDIAN_LANGUAGES } from '../data/indianLanguages';
import { INITIAL_CONVERSATION } from '../data/mockConversations';
import { ArchitectureNode } from '../types/architecture';
import { ARCHITECTURE_NODES } from '../data/architectureNodes';
import { UniversityDocument } from '../types/knowledge';

export type AppRoute =
  | 'about'
  | 'assistant'
  | 'architecture'
  | 'knowledge'
  | 'technology'
  | 'security'
  | 'team';

interface AppContextType {
  currentRoute: AppRoute;
  navigateTo: (route: AppRoute) => void;
  selectedLanguage: IndianLanguage;
  setSelectedLanguageCode: (code: LanguageCode) => void;
  voiceState: VoiceState;
  setVoiceState: (state: VoiceState) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  fallbackMode: FallbackMode;
  setFallbackMode: (mode: FallbackMode) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  resetConversation: () => void;
  activeCitation: Citation | null;
  setActiveCitation: (citation: Citation | null) => void;
  activeArchitectureNode: ArchitectureNode | null;
  setActiveArchitectureNode: (node: ArchitectureNode | null) => void;
  activeKnowledgeDoc: UniversityDocument | null;
  setActiveKnowledgeDoc: (doc: UniversityDocument | null) => void;
  isPlayingAudio: boolean;
  setIsPlayingAudio: (playing: boolean) => void;
  playbackAudioText: string | null;
  setPlaybackAudioText: (text: string | null) => void;
  triggerVoiceQuerySimulation: (promptText?: string, customLang?: LanguageCode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('about');
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>(INDIAN_LANGUAGES[0]);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [fallbackMode, setFallbackMode] = useState<FallbackMode>('none');
  const [messages, setMessages] = useState<Message[]>(INITIAL_CONVERSATION);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [activeArchitectureNode, setActiveArchitectureNode] = useState<ArchitectureNode | null>(null);
  const [activeKnowledgeDoc, setActiveKnowledgeDoc] = useState<UniversityDocument | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackAudioText, setPlaybackAudioText] = useState<string | null>(null);

  // Sync hash with route if available
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validRoutes: AppRoute[] = ['about', 'assistant', 'architecture', 'knowledge', 'technology', 'security', 'team'];
      if (validRoutes.includes(hash as AppRoute)) {
        setCurrentRoute(hash as AppRoute);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedLanguageCode = (code: LanguageCode) => {
    const found = INDIAN_LANGUAGES.find((l) => l.code === code) || INDIAN_LANGUAGES[0];
    setSelectedLanguage(found);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const resetConversation = () => {
    setMessages(INITIAL_CONVERSATION);
    setVoiceState('idle');
    setIsPlayingAudio(false);
  };

  const triggerVoiceQuerySimulation = (customPrompt?: string, customLang?: LanguageCode) => {
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
        const userMsg: Message = {
          id: `msg-${Date.now()}-user`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: lang.code,
          text: queryText,
          audioDurationSeconds: 4.5,
          transcriptionConfidence: 0.988,
        };
        addMessage(userMsg);

        // Step 4: Reasoning (Foundry Agent + RAG)
        setVoiceState('reasoning');

        setTimeout(() => {
          // Handle Fallback modes if active
          let assistantMsg: Message;

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
              errorReason: 'Foundry IQ Guardrail: Cosine Similarity < 0.70 threshold across all indices.',
            };
          } else if (fallbackMode === 'functions_timeout') {
            assistantMsg = {
              id: `msg-${Date.now()}-ast`,
              sender: 'assistant',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language: lang.code,
              text: 'The university ERP database is currently experiencing high load and did not respond within the 5.0s SLA window. Your general inquiry has been noted, please retry the transaction shortly.',
              isErrorFallback: true,
              errorReason: 'Azure Functions: HTTP 504 Gateway Timeout from legacy ERP endpoint.',
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
                  description: 'Calls Azure Function SIS tool to calculate real-time attendance across registered courses.',
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
                  azureService: 'Microsoft Foundry Agent (GPT-4o)',
                  latencyMs: 172,
                  detail: 'Parsed query intent and entity rules. Dispatched RAG search vector.',
                  status: 'completed',
                },
                {
                  step: 3,
                  layer: 'RAG Retrieval',
                  azureService: 'Foundry IQ → Azure AI Search',
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
