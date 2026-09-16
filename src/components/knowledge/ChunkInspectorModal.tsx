import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { X, Layers, Database, Sparkles, CheckCircle2, Search } from 'lucide-react';

export const ChunkInspectorModal: React.FC = () => {
  const { activeKnowledgeDoc, setActiveKnowledgeDoc } = useApp();

  if (!activeKnowledgeDoc) return null;

  const doc = activeKnowledgeDoc;

  return (
    <div className="drawer-backdrop" onClick={() => setActiveKnowledgeDoc(null)}>
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '640px' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Layers size={20} color="#0078D4" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A' }}>
                RAG Vector Chunks Inspector
              </h3>
            </div>
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Index: <code>{doc.azureIndexName}</code>
            </span>
          </div>

          <button
            onClick={() => setActiveKnowledgeDoc(null)}
            className="btn btn-subtle btn-sm"
            style={{ padding: '0.35rem' }}
            aria-label="Close Chunk Inspector"
          >
            <X size={20} />
          </button>
        </div>

        {/* Doc Header Info */}
        <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>{doc.title}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '0.5rem' }}>
            <Badge variant="azure">{doc.category}</Badge>
            <Badge variant="outline">{doc.totalChunks} Chunks Indexed</Badge>
            <Badge variant="success">Embedding: text-embedding-3-large (3072-dim)</Badge>
          </div>
        </div>

        {/* Chunks List */}
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
            Extracted Vector Chunks in Azure AI Search
          </div>

          {doc.chunks.map((chunk) => (
            <div
              key={chunk.chunkId}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0078D4', background: '#EBF3FC', padding: '2px 8px', borderRadius: '4px' }}>
                  Chunk #{chunk.chunkIndex} ({chunk.chunkId})
                </span>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: '#64748B' }}>
                  <span>{chunk.tokenCount} tokens</span>
                  <span>•</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>
                    Cosine Score: {chunk.cosineSimilarity?.toFixed(3)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#1E293B',
                  lineHeight: 1.6,
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  padding: '0.875rem',
                  borderRadius: '6px',
                }}
              >
                {chunk.content}
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                <span>Model: {chunk.embeddingModel}</span>
                <span>Dimensions: {chunk.vectorDimensions} floats</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setActiveKnowledgeDoc(null)}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
