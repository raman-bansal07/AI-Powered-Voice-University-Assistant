export type DocumentCategory =
  | 'Academic Information'
  | 'Admissions'
  | 'Examinations'
  | 'Timetables'
  | 'Fees & Scholarships'
  | 'Departments & Faculty'
  | 'Campus Services'
  | 'Notices & Circulars'
  | 'University Policies';

export interface KnowledgeChunk {
  chunkId: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  vectorDimensions: number;
  cosineSimilarity?: number;
  embeddingModel: string;
}

export interface UniversityDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  department: string;
  fileType: 'PDF' | 'Circular' | 'Handbook' | 'Regulation';
  fileSize: string;
  totalChunks: number;
  lastIndexed: string;
  accessLevel: 'Public' | 'Student Entra ID Required' | 'Faculty Only';
  azureIndexName: string;
  summary: string;
  topKeywords: string[];
  chunks: KnowledgeChunk[];
}
