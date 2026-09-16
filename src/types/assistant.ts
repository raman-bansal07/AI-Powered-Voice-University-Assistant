export type LanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'bn'
  | 'mr'
  | 'gu'
  | 'pa';

export interface IndianLanguage {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  locale: string;
  voiceName: string;
  voiceActor: string;
  samplePrompt: string;
  samplePromptEn: string;
}

export interface Citation {
  id: string;
  docTitle: string;
  category: string;
  section: string;
  pageNumber: number;
  confidence: number;
  snippet: string;
  fileType: 'pdf' | 'circular' | 'portal' | 'db' | 'Handbook' | 'Regulation';
  accessLevel: 'public' | 'student-authenticated' | 'faculty-restricted';
  azureSearchScore: number;
}

export interface ActionTrigger {
  id: string;
  type: 'download_pdf' | 'api_call' | 'schedule' | 'portal_redirect';
  title: string;
  description: string;
  endpoint: string;
  payloadSummary: string;
  status: 'available' | 'executed' | 'pending';
  buttonText: string;
}

export interface AgentStepTrace {
  step: number;
  layer: 'STT' | 'Agent Reasoning' | 'RAG Retrieval' | 'Tool Execution' | 'TTS Synthesis';
  azureService: string;
  latencyMs: number;
  detail: string;
  status: 'completed' | 'skipped' | 'fallback';
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  language: LanguageCode;
  text: string;
  audioDurationSeconds?: number;
  transcriptionConfidence?: number;
  intent?: string;
  citations?: Citation[];
  actions?: ActionTrigger[];
  trace?: AgentStepTrace[];
  isErrorFallback?: boolean;
  errorReason?: string;
}

export type VoiceState = 'idle' | 'listening' | 'transcribing' | 'reasoning' | 'speaking';

export type UserRole = 'guest' | 'student' | 'faculty';

export type FallbackMode = 'none' | 'stt_low_snr' | 'rag_out_of_bounds' | 'functions_timeout' | 'entra_unauthorized';
