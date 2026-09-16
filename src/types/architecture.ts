export type LayerType = 'client' | 'backend' | 'stt' | 'agent' | 'rag' | 'tools' | 'tts';

export interface ArchitectureNode {
  id: string;
  label: string;
  subtitle: string;
  layer: LayerType;
  azureService?: string;
  iconName: string;
  description: string;
  technicalRole: string;
  dataFlowIn: string;
  dataFlowOut: string;
  latencySla: string;
  samplePayloadIn?: Record<string, any>;
  samplePayloadOut?: Record<string, any>;
  sdkCodeSnippet?: string;
  connectionsTo: string[];
}

export interface TraceStep {
  stepNumber: number;
  nodeId: string;
  title: string;
  subtitle: string;
  layer: LayerType;
  azureService: string;
  actionSummary: string;
  payloadPreview: string;
  latencyMs: number;
}
