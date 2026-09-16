import React, { useState } from 'react';
import { UNIVERSITY_DOCUMENTS } from '../data/knowledgeDocuments';
import { DocumentCard } from '../components/knowledge/DocumentCard';
import { ChunkInspectorModal } from '../components/knowledge/ChunkInspectorModal';
import { Search, Database } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Academic Information',
    'Examinations',
    'Fees & Scholarships',
    'Campus Services',
    'University Policies',
  ];

  const filteredDocs = UNIVERSITY_DOCUMENTS.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: '1.5rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
          <span className="badge badge-azure">
            <Database size={12} />
            Foundry IQ & AI Search
          </span>
          <span className="badge badge-success">8 Indexed Documents</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
          University Knowledge & RAG Index
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
          Official university circulars vectorized with <code>text-embedding-3-large</code> in Azure AI Search. Click any document to inspect vector chunks.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div
        className="card"
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regulations, attendance rules, fee deadlines, or exams..."
            style={{
              width: '100%',
              padding: '0.55rem 1rem 0.55rem 2.25rem',
              fontSize: '0.875rem',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontSize: '0.75rem',
                fontWeight: selectedCategory === cat ? 600 : 500,
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: selectedCategory === cat ? '1px solid #0078D4' : '1px solid #E2E8F0',
                background: selectedCategory === cat ? '#EFF6FF' : '#FFFFFF',
                color: selectedCategory === cat ? '#0078D4' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredDocs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Chunk Inspector Modal */}
      <ChunkInspectorModal />
    </div>
  );
};
