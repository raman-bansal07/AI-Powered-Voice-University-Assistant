import React from 'react';
import { useApp } from '../../context/AppContext';
import { UniversityDocument } from '../../types/knowledge';
import { Badge } from '../common/Badge';
import { FileText, Layers, Search, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

interface DocumentCardProps {
  doc: UniversityDocument;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
  const { setActiveKnowledgeDoc } = useApp();

  return (
    <div
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* Category & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <Badge variant="azure">{doc.category}</Badge>
          <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} /> {doc.lastIndexed.split(' ')[0]}
          </span>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.35 }}>
          {doc.title}
        </h4>

        {/* Department & File details */}
        <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.75rem', display: 'flex', gap: '8px' }}>
          <span>{doc.department}</span>
          <span>•</span>
          <span>{doc.fileType} ({doc.fileSize})</span>
        </div>

        {/* Summary */}
        <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5, marginBottom: '1rem' }}>
          {doc.summary}
        </p>

        {/* Keywords */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1.25rem' }}>
          {doc.topKeywords.map((kw) => (
            <span
              key={kw}
              style={{
                fontSize: '0.6875rem',
                backgroundColor: '#F1F5F9',
                color: '#334155',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Stats & CTA */}
      <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={13} color="#0078D4" />
            <strong>{doc.totalChunks}</strong> Vector Chunks Indexed
          </span>
          <span
            style={{
              fontSize: '0.6875rem',
              color: doc.accessLevel.includes('Required') ? '#D97706' : '#059669',
              fontWeight: 600,
            }}
          >
            {doc.accessLevel}
          </span>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'space-between' }}
          onClick={() => setActiveKnowledgeDoc(doc)}
        >
          <span>Inspect RAG Vector Chunks</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
