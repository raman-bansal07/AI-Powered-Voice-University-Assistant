import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  X,
  FileText,
  Search,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const CitationDrawer: React.FC = () => {
  const { activeCitation, setActiveCitation, navigateTo } = useApp();

  if (!activeCitation) return null;

  return (
    <div className="drawer-backdrop" onClick={() => setActiveCitation(null)}>
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
      >
        {/* Drawer Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#0078D4" />
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Grounded Document Source</h3>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Foundry IQ & Azure AI Search Index
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveCitation(null)}
            className="btn btn-subtle btn-sm"
            style={{ padding: '0.35rem' }}
            aria-label="Close Source Inspector"
          >
            <X size={20} />
          </button>
        </div>

        {/* Document Metadata Grid */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Document Title
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F172A' }}>
              {activeCitation.docTitle}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>SECTION / ORDINANCE</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1E293B' }}>{activeCitation.section}</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>PAGE NUMBER</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0078D4' }}>Page {activeCitation.pageNumber}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <Badge variant="azure" icon={<Search size={12} />}>
              Azure Search Score: {activeCitation.azureSearchScore.toFixed(3)}
            </Badge>
            <Badge variant="success" icon={<CheckCircle size={12} />}>
              Grounding Confidence: {(activeCitation.confidence * 100).toFixed(1)}%
            </Badge>
            <Badge variant="outline" icon={<ShieldCheck size={12} />}>
              Access: {activeCitation.accessLevel}
            </Badge>
          </div>
        </div>

        {/* Retrieved Raw Chunk Snippet */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Retrieved Text Chunk (Vector Match)
          </div>
          <div
            style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.875rem',
              color: '#92400E',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            "{activeCitation.snippet}"
          </div>
        </div>

        {/* Verification guarantee info */}
        <div
          style={{
            backgroundColor: '#F1F5F9',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            fontSize: '0.8125rem',
            color: '#475569',
          }}
        >
          <strong>Enterprise Verification Notice:</strong> This text chunk was retrieved from the university’s indexed corpus on Azure AI Search via Dense Vector Embeddings (<code>text-embedding-3-large</code>) and validated by the Microsoft Foundry Agent before synthesis.
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            className="btn btn-primary"
            style={{ width: '100%', gap: '8px' }}
            onClick={() => {
              setActiveCitation(null);
              navigateTo('knowledge');
            }}
          >
            <Layers size={16} />
            <span>Explore All Knowledge Documents</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
