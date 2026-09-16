export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  responsibilities: string[];
  azureBadges: string[];
  avatarInitial: string;
}

export interface EvaluationCriterion {
  id: string;
  title: string;
  weightage: string;
  description: string;
  projectImplementation: string;
  status: 'Exceeds Expectations' | 'Fully Implemented' | 'Demonstrated in Prototype';
}

export const PROJECT_METADATA = {
  projectTitle: 'Multilingual Voice-Based University Assistant',
  institution: 'Department of Computer Science & Engineering (AI & ML)',
  department: 'Department of Computer Science & Engineering (CSE - AI/ML)',
  academicYear: '2025 – 2026',
  projectType: 'Senior Capstone AI Engineering / Azure Cloud Systems Project',
  supervisor: 'Shreyas Gowda, Microsoft Certified Trainer & Azure AI Specialist',
  trainer: 'Shreyas Gowda, Microsoft Certified Trainer & Azure AI Specialist',
  cloudPlatform: 'Microsoft Azure (Enterprise Tenant Subscription)',
  targetEvaluatorsCount: 40,
};

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    id: 'crit-arch',
    title: 'Azure Cloud Architecture & System Design',
    weightage: '25%',
    description: 'Fidelity of end-to-end cloud pipeline, clear decoupling between STT, Reasoning Agent, RAG Search, Serverless Tools, and Neural TTS.',
    projectImplementation: 'Exact 3-layer architecture with Microsoft Foundry Agent, Foundry IQ, Azure AI Search, Azure Functions, Azure AI Speech, and Entra ID.',
    status: 'Exceeds Expectations',
  },
  {
    id: 'crit-rag',
    title: 'RAG Grounding & Anti-Hallucination Guardrails',
    weightage: '20%',
    description: 'Precision of document retrieval, cosine similarity thresholds, verifiable citation page/section attribution, and refusal to fabricate out-of-domain answers.',
    projectImplementation: 'Hybrid dense vector + BM25 search on Azure AI Search with strict system grounding prompt and verifiable snippet viewer.',
    status: 'Fully Implemented',
  },
  {
    id: 'crit-multilingual',
    title: 'Multilingual Speech & Accessibility',
    weightage: '20%',
    description: 'Coverage of Indian regional languages, natural intonation, dialect resilience, and seamless voice-first user experience.',
    projectImplementation: 'Support for 10 Indic languages with Azure AI Speech neural voices (Swara, Neerja, Pallavi, Shruti) and live audio waveform visualizer.',
    status: 'Exceeds Expectations',
  },
  {
    id: 'crit-actions',
    title: 'Functional Tool Execution & ERP Integration',
    weightage: '15%',
    description: 'Ability of the agent to move beyond static Q&A to execute real university tasks (hall ticket generation, fee queries, medical condonation).',
    projectImplementation: 'Azure Functions serverless tool calling with structured JSON arguments and real-time interactive UI action cards.',
    status: 'Fully Implemented',
  },
  {
    id: 'crit-security',
    title: 'Security, Privacy & Role-Based Access Control',
    weightage: '10%',
    description: 'Protection of sensitive student records, Zero-Trust authentication, PII data masking, and enterprise role separation.',
    projectImplementation: 'Microsoft Entra ID token-gated authorization with interactive RBAC simulator (Guest vs Enrolled Student vs Exam Official).',
    status: 'Demonstrated in Prototype',
  },
  {
    id: 'crit-uiux',
    title: 'UI/UX Polish, Usability & Evaluator Experience',
    weightage: '10%',
    description: 'Enterprise Microsoft aesthetic, responsive layout, sub-second latency visualization, error fallback resilience, and clear technical documentation.',
    projectImplementation: 'Sober Microsoft Fluent design system, desktop-optimized at 1440px with responsive mobile support, zero clutter, and step-by-step trace engine.',
    status: 'Exceeds Expectations',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Team Lead & Architecture Engineer',
    role: 'Cloud Systems & Foundry Agent Lead',
    specialization: 'Microsoft Azure Cloud, Agent Orchestration & Node.js Gateway',
    responsibilities: [
      'Designed the multi-layer pipeline connecting STT, Foundry Agent, RAG, and TTS',
      'Configured Microsoft Foundry Agent reasoning loops and system prompts',
      'Implemented Node.js WebSocket orchestration gateway for real-time audio streams',
    ],
    azureBadges: ['Azure Solutions Architect Expert', 'Azure AI Engineer Associate'],
    avatarInitial: 'TL',
  },
  {
    id: 'member-2',
    name: 'AI & Knowledge Retrieval Engineer',
    role: 'RAG Pipeline & Vector Search Specialist',
    specialization: 'Foundry IQ, Azure AI Search & OpenAI Embeddings',
    responsibilities: [
      'Engineered table-preserving document chunking in Foundry IQ for academic circulars',
      'Configured Azure AI Search hybrid vector + semantic re-ranking index',
      'Implemented grounded citation attribution with cosine similarity verification',
    ],
    azureBadges: ['Azure AI Fundamentals', 'Generative AI Engineering on Azure'],
    avatarInitial: 'KR',
  },
  {
    id: 'member-3',
    name: 'Cognitive Speech & Multilingual Specialist',
    role: 'Azure AI Speech & Localization Engineer',
    specialization: 'Speech-to-Text, Neural TTS & Indic Language Processing',
    responsibilities: [
      'Configured Azure AI Speech recognition pipelines for 10 Indian languages',
      'Tuned SSML prosody and custom phonetic lexicon for university terminology',
      'Engineered low-latency audio capture and streaming playback visualizers',
    ],
    azureBadges: ['Azure Cognitive Services Specialist'],
    avatarInitial: 'SL',
  },
  {
    id: 'member-4',
    name: 'Security & Full-Stack UI/UX Engineer',
    role: 'Entra ID Security & Enterprise Frontend Lead',
    specialization: 'Microsoft Entra ID, React, Azure Functions & Accessible UX',
    responsibilities: [
      'Built Microsoft Fluent inspired design system and interactive prototype',
      'Implemented Entra ID Zero-Trust authentication and RBAC simulator',
      'Developed Azure Functions serverless endpoints for SIS/ERP actions',
    ],
    azureBadges: ['Azure Security Engineer Associate', 'Azure Developer Associate'],
    avatarInitial: 'UX',
  },
];
