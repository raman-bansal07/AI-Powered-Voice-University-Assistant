export const AZURE_SERVICES_DATA = [
  {
    id: 'azure-ai-speech',
    name: 'Azure AI Speech',
    tagline: 'Speech-to-Text & Neural Voice Synthesis',
    iconName: 'Mic',
    category: 'Cognitive & Speech',
    roleInProject: 'Real-time Indian language speech recognition and neural voice synthesis.',
    problemSolved: 'Enables hands-free voice interactions in regional Indian dialects.',
    keyFeatures: [
      '10+ Indic neural voices (Hindi, Tamil, Telugu, Marathi, English)',
      'Sub-150ms real-time streaming latency with custom SSML support',
    ],
    slaMetrics: {
      availability: '99.9%',
      avgLatency: '< 140ms',
      throughput: 'Real-time Stream',
    },
    sampleCode: `import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_SPEECH_KEY, process.env.AZURE_SPEECH_REGION);
speechConfig.speechRecognitionLanguage = "hi-IN";
speechConfig.speechSynthesisVoiceName = "hi-IN-SwaraNeural";`,
    securityCompliance: 'Zero Customer Data Retention • TLS 1.3',
  },
  {
    id: 'azure-openai-models',
    name: 'Azure OpenAI (GPT-4o)',
    tagline: 'Enterprise Reasoning Core with Grounding',
    iconName: 'Sparkles',
    category: 'Reasoning Models',
    roleInProject: 'Multilingual intent understanding and citation-grounded response generation.',
    problemSolved: 'Guarantees hallucination-free answers strictly tied to official ordinances.',
    keyFeatures: [
      'Grounded reasoning with strict source verification',
      'Multilingual tokenization covering Indic scripts',
    ],
    slaMetrics: {
      availability: '99.99%',
      avgLatency: '150ms TTFT',
      throughput: '150k TPM',
    },
    sampleCode: `import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
const res = await client.getChatCompletions("gpt-4o", [
  { role: "system", content: "Ground answers strictly in provided citations." },
  { role: "user", content: groundedPrompt }
]);`,
    securityCompliance: 'Private Tenant • No Model Retraining on Student Data',
  },
  {
    id: 'azure-ai-search',
    name: 'Azure AI Search',
    tagline: 'Hybrid Vector & Semantic Re-ranking',
    iconName: 'Search',
    category: 'Knowledge & Search',
    roleInProject: 'Sub-100ms vector search across indexed university circulars and syllabi.',
    problemSolved: 'Instantly extracts exact regulation sections, clauses, and fee tables.',
    keyFeatures: [
      'Dense 3072-dim vector search + Semantic Re-ranker',
      'Field-level security filters for public vs confidential data',
    ],
    slaMetrics: {
      availability: '99.9%',
      avgLatency: '< 75ms',
      throughput: '10k queries/min',
    },
    sampleCode: `import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(endpoint, "univ-docs", new AzureKeyCredential(apiKey));
const results = await searchClient.search(query, {
  vectorSearchOptions: { queries: [{ kind: "vector", vector: queryVector, kNearestNeighborsCount: 3 }] },
  queryType: "semantic"
});`,
    securityCompliance: 'SOC 1/2/3 • Azure RBAC Protected',
  },
  {
    id: 'microsoft-entra-id',
    name: 'Microsoft Entra ID',
    tagline: 'Zero-Trust Identity & Access Control',
    iconName: 'ShieldCheck',
    category: 'Security & Identity',
    roleInProject: 'Role-based JWT authentication protecting private student records.',
    problemSolved: 'Prevents unauthorized access to sensitive grades and fee records.',
    keyFeatures: [
      'OAuth2 / OIDC token claim validation (Student vs Faculty vs Guest)',
      'Zero-Trust token signature verification with RSA public keys',
    ],
    slaMetrics: {
      availability: '99.99%',
      avgLatency: '< 15ms',
      throughput: 'Distributed Auth',
    },
    sampleCode: `import { ConfidentialClientApplication } from "@azure/msal-node";

const pca = new ConfidentialClientApplication({
  auth: { clientId: process.env.ENTRA_ID, authority: "https://login.microsoftonline.com/tenant" }
});`,
    securityCompliance: 'FIPS 140-2 Level 3 HSM • ISO 27001',
  },
];
