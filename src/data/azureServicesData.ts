export interface AzureServiceDoc {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  category: 'Agent Orchestration' | 'Knowledge & Search' | 'Cognitive & Speech' | 'Reasoning Models' | 'Compute & Integration' | 'Security & Identity';
  roleInProject: string;
  problemSolved: string;
  dataFlowDescription: string;
  connectionToOtherServices: string[];
  keyFeatures: string[];
  slaMetrics: {
    availability: string;
    avgLatency: string;
    throughput: string;
  };
  sampleCode: string;
  securityCompliance: string;
}

export const AZURE_SERVICES_DATA: AzureServiceDoc[] = [
  {
    id: 'microsoft-foundry',
    name: 'Microsoft Foundry — AI Agent',
    tagline: 'Enterprise Autonomous Agent Runtime & Decision Loop',
    iconName: 'Bot',
    category: 'Agent Orchestration',
    roleInProject: 'Serves as the central reasoning orchestrator that receives student queries, decomposes complex multi-intent requests, plans step-by-step executions, invokes Foundry IQ RAG search, and executes serverless university tools.',
    problemSolved: 'Replaces rigid, brittle intent-based chatbots with an adaptive cognitive agent that can maintain multi-turn academic context and reason over messy, ambiguous student inquiries.',
    dataFlowDescription: 'Ingests transcribed text from STT Layer -> Evaluates system prompts and student profile -> Dispatches parallel search vectors to Azure AI Search & tool calls to Azure Functions -> Compiles grounded answer.',
    connectionToOtherServices: [
      'Azure OpenAI / Foundry Models (Reasoning Core)',
      'Foundry IQ (Knowledge Retrieval Fabric)',
      'Azure Functions (Custom University Tools)',
      'Node.js Gateway (Session Ingestion)',
    ],
    keyFeatures: [
      'Multi-turn thread and session state management',
      'Autonomous ReAct reasoning loop with dynamic tool invocation',
      'Built-in safety filters and groundedness verification evaluation metrics',
      'Telemetry tracing via Azure Application Insights',
    ],
    slaMetrics: {
      availability: '99.99%',
      avgLatency: '180ms – 240ms',
      throughput: '1,500 requests/sec',
    },
    sampleCode: `import { AIProjectsClient } from "@azure/ai-projects";

const client = new AIProjectsClient(process.env.AZURE_FOUNDRY_CONNECTION_STRING);
const agent = await client.agents.getAgent(process.env.UNIVERSITY_AGENT_ID);

// Execute reasoning thread
const thread = await client.agents.createThread();
await client.agents.createMessage(thread.id, {
  role: "user",
  content: studentQueryText
});

const run = await client.agents.createRunAndPoll(thread.id, agent.id);`,
    securityCompliance: 'FedRAMP High, ISO 27001, HIPAA compliant, Zero Training Retention Policy.',
  },
  {
    id: 'foundry-iq',
    name: 'Foundry IQ — University Knowledge / RAG',
    tagline: 'Enterprise Knowledge Fabric & Semantic Chunking Engine',
    iconName: 'Layers',
    category: 'Knowledge & Search',
    roleInProject: 'Automates the ingestion, hierarchical chunking, metadata enrichment, and vector pipeline connecting raw university documents (PDFs, circulars, handbooks) to the retrieval engine.',
    problemSolved: 'Prevents RAG retrieval degradation caused by arbitrarily split PDF pages, table disruption in exam fee structures, and fragmented circular updates.',
    dataFlowDescription: 'Monitors Azure Blob Storage for new university circular uploads -> Applies OCR and document layout parsing -> Generates vector embeddings via text-embedding-3-large -> Updates Azure AI Search indexes.',
    connectionToOtherServices: [
      'Microsoft Foundry (Receives semantic search requests)',
      'Azure AI Search (Populates and queries vector indexes)',
      'Azure Blob Storage (Raw document storage)',
    ],
    keyFeatures: [
      'Layout-aware document chunking (preserves complex tables in syllabus & fee matrices)',
      'Automatic metadata tagging by department, date, and access classification',
      'Continuous incremental indexing without downtime',
      'Cross-lingual semantic embedding alignment for Indian vernacular terms',
    ],
    slaMetrics: {
      availability: '99.95%',
      avgLatency: '60ms – 90ms',
      throughput: '500 chunks/sec ingestion',
    },
    sampleCode: `// Ingest and chunk university ordinance document via Foundry IQ
import { KnowledgeEngineClient } from "@azure/ai-knowledge";

const engine = new KnowledgeEngineClient(endpoint, credentials);
await engine.ingestDocument({
  documentUri: "https://univstorage.blob.core.windows.net/circulars/COE-2025-08.pdf",
  chunkingStrategy: "layout-aware-table-preserving",
  embeddingModel: "text-embedding-3-large",
  targetIndex: "univ-exam-notices"
});`,
    securityCompliance: 'Encrypted at rest with Customer-Managed Keys (CMK) and in transit with TLS 1.3.',
  },
  {
    id: 'azure-ai-search',
    name: 'Azure AI Search — Search & Retrieval',
    tagline: 'Hybrid Dense Vector & Semantic Re-ranking Search Engine',
    iconName: 'Search',
    category: 'Knowledge & Search',
    roleInProject: 'Executes high-speed sub-100ms vector similarity searches combined with traditional BM25 keyword matching and Microsoft proprietary Semantic Re-ranker to find exact university regulations.',
    problemSolved: 'Eliminates AI hallucinations by ensuring every generated claim is mathematically grounded in verified university documentation with citation traceability.',
    dataFlowDescription: 'Receives dense query vector array from Foundry Agent -> Performs HNSW (Hierarchical Navigable Small World) vector search -> Applies Semantic Re-ranker -> Returns ranked snippet chunks.',
    connectionToOtherServices: [
      'Foundry IQ (Receives vectorized document indexes)',
      'Microsoft Foundry Agent (Supplies top-K grounded chunks)',
      'Azure OpenAI (Provides text embeddings)',
    ],
    keyFeatures: [
      'Hybrid search (Dense 3072-dimensional vectors + Sparse keyword BM25)',
      'Microsoft Turing-based Semantic Re-ranking model for nuance understanding',
      'Field-level security filters (e.g. restrict private student documents)',
      'Built-in cosine similarity scoring for confidence thresholding',
    ],
    slaMetrics: {
      availability: '99.9%',
      avgLatency: '35ms – 85ms',
      throughput: '10,000 queries/min',
    },
    sampleCode: `import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(endpoint, "univ-academic-docs", new AzureKeyCredential(apiKey));

const searchResults = await searchClient.search(queryText, {
  vectorSearchOptions: {
    queries: [{ kind: "vector", vector: queryVector, kNearestNeighborsCount: 3, fields: ["contentVector"] }]
  },
  queryType: "semantic",
  semanticSearchOptions: { configurationName: "univ-semantic-config" },
  top: 3
});`,
    securityCompliance: 'SOC 1/2/3, ISO 27018, Role-based Azure RBAC security.',
  },
  {
    id: 'azure-ai-speech',
    name: 'Azure AI Speech — STT & TTS',
    tagline: 'Multilingual Speech-to-Text & Neural Text-to-Speech',
    iconName: 'Mic',
    category: 'Cognitive & Speech',
    roleInProject: 'Powers the end-to-end voice interface: transcribing spoken Indian languages (Hindi, Tamil, Telugu, Kannada, Bengali, etc.) in real-time, and synthesizing natural, human-like voice responses.',
    problemSolved: 'Breaks language and literacy barriers for students who prefer speaking in their mother tongue over typing formal English queries on complex academic portals.',
    dataFlowDescription: 'Audio from browser Web Audio API -> WebSocket stream to Azure Speech STT -> Generates unicode transcript -> Assistant synthesizes answer -> Azure Speech TTS streams back neural audio to browser.',
    connectionToOtherServices: [
      'Node.js Gateway (WebSocket binary audio transport)',
      'Microsoft Foundry Agent (Consumes STT text and feeds TTS text)',
    ],
    keyFeatures: [
      'High Word Error Rate (WER) resilience across Indian regional accents',
      'SSML support for custom pronunciation of university acronyms (CGPA, HOD, COE)',
      'Ultra-low-latency real-time WebSocket audio streaming',
      '10+ Indian locale neural voices (Swara, Neerja, Pallavi, Shruti, etc.)',
    ],
    slaMetrics: {
      availability: '99.9%',
      avgLatency: '100ms STT / 90ms TTS',
      throughput: 'Concurrent audio streaming',
    },
    sampleCode: `import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
speechConfig.speechRecognitionLanguage = "hi-IN"; // Hindi locale
speechConfig.speechSynthesisVoiceName = "hi-IN-SwaraNeural";

const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
recognizer.recognizeOnceAsync(result => {
  console.log("Transcribed text:", result.text);
});`,
    securityCompliance: 'No persistent audio logging on Azure servers; Zero customer data retention.',
  },
  {
    id: 'azure-openai-models',
    name: 'Azure OpenAI / Foundry Models — LLM Core',
    tagline: 'Enterprise Reasoning Engines (GPT-4o / GPT-4o-mini)',
    iconName: 'Sparkles',
    category: 'Reasoning Models',
    roleInProject: 'Provides state-of-the-art multilingual understanding, prompt grounding, academic reasoning, and structured tool calling inside the university’s isolated Azure tenant.',
    problemSolved: 'Translates complex administrative ordinances into clear, actionable bullet points without hallucinating or giving misleading advice to students.',
    dataFlowDescription: 'Receives prompt containing university persona, retrieved RAG context snippets, and student query -> Generates structured grounded output in the target Indian language.',
    connectionToOtherServices: [
      'Microsoft Foundry Agent (Executes the model inside agent loop)',
      'Azure AI Search (Supplies grounding context snippets)',
    ],
    keyFeatures: [
      'Fine-tuned system instructions enforcing zero extrapolation beyond cited docs',
      'JSON mode and structured tool calling for deterministic API payload generation',
      'Enterprise SLA with private endpoint VNet deployment',
      'Native multi-lingual tokenization covering Indic scripts',
    ],
    slaMetrics: {
      availability: '99.99%',
      avgLatency: '150ms TTFT',
      throughput: '150,000 TPM',
    },
    sampleCode: `import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
const response = await client.getChatCompletions("gpt-4o", [
  { role: "system", content: "You are the official University Assistant. Ground all answers strictly in provided citations." },
  { role: "user", content: groundedPromptWithRAGContext }
], { temperature: 0.1 });`,
    securityCompliance: 'Customer data is NEVER used to train OpenAI foundation models; GDPR & HIPAA compliant.',
  },
  {
    id: 'azure-functions',
    name: 'Azure Functions — University Tools & Actions',
    tagline: 'Serverless Compute for ERP, SIS & Exam Portals',
    iconName: 'Zap',
    category: 'Compute & Integration',
    roleInProject: 'Acts as the tool execution layer, allowing the Assistant to run verified transactional actions (e.g. check fee dues, generate hall tickets, fetch attendance) by interfacing with existing university databases.',
    problemSolved: 'Turns the assistant from a passive FAQ bot into an active, practical utility that can complete real student administrative tasks in seconds.',
    dataFlowDescription: 'Foundry Agent decides tool call -> Sends authenticated JSON argument to Azure Function -> Function queries university ERP database -> Returns structured status back to agent.',
    connectionToOtherServices: [
      'Microsoft Foundry Agent (Triggers function calls)',
      'University SIS / ERP Database (Backing database)',
      'Microsoft Entra ID (Validates student bearer token)',
    ],
    keyFeatures: [
      'Sub-100ms serverless execution with instant autoscaling for registration spikes',
      'Managed Identity authentication connecting securely to backend SQL databases',
      'Deterministic output schemas ensuring reliable downstream LLM synthesis',
      'Zero idle server costs',
    ],
    slaMetrics: {
      availability: '99.95%',
      avgLatency: '45ms – 80ms',
      throughput: 'Auto-scaling to 10k instances',
    },
    sampleCode: `import { app, HttpRequest, HttpResponseInit } from "@azure/functions";

app.http('getStudentDues', {
  methods: ['POST'],
  authLevel: 'function',
  handler: async (req: HttpRequest): Promise<HttpResponseInit> => {
    const { studentRollNo } = await req.json();
    const records = await queryUniversityERP(studentRollNo);
    return { jsonBody: { status: 'SUCCESS', records } };
  }
});`,
    securityCompliance: 'Network isolation via Virtual Network integration and Managed Identity RBAC.',
  },
  {
    id: 'microsoft-entra-id',
    name: 'Microsoft Entra ID — Authentication & Security',
    tagline: 'Zero-Trust Identity & Role-Based Access Control (RBAC)',
    iconName: 'ShieldCheck',
    category: 'Security & Identity',
    roleInProject: 'Governs student and faculty authentication, issuing OAuth2 / OpenID Connect JWT tokens to ensure private student records (grades, fee receipts, disciplinary status) are only accessible to authorized users.',
    problemSolved: 'Prevents unauthorized data leakage and impersonation while allowing seamless single sign-on (SSO) with official university student credentials.',
    dataFlowDescription: 'Student logs in with University email -> Entra ID issues signed JWT with roles (`Student.Enrolled`, `Faculty`, `Guest`) -> Assistant verifies token claims before exposing private student endpoints.',
    connectionToOtherServices: [
      'Node.js Gateway (Validates JWT tokens on API requests)',
      'Azure Functions (Enforces role-based permissions)',
      'Azure AI Search (Applies security filters to private document indexes)',
    ],
    keyFeatures: [
      'Conditional Access policies and Multi-Factor Authentication (MFA)',
      'Granular claim-based authorization (`Role`, `Department`, `Semester`)',
      'Zero-Trust Token validation with public RSA certificate verification',
      'Audit logging and compliance reporting in Azure Sentinel',
    ],
    slaMetrics: {
      availability: '99.99%',
      avgLatency: '< 15ms token verification',
      throughput: 'Global distributed auth',
    },
    sampleCode: `import { ConfidentialClientApplication } from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.ENTRA_CLIENT_ID,
    authority: "https://login.microsoftonline.com/" + process.env.ENTRA_TENANT_ID,
    clientSecret: process.env.ENTRA_CLIENT_SECRET
  }
};
const pca = new ConfidentialClientApplication(msalConfig);`,
    securityCompliance: 'Zero-Trust compliant, FIPS 140-2 Level 3 HSM token signing, ISO 27001.',
  },
];
