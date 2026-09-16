import React from 'react';
import { ArchitectureDiagram } from '../components/architecture/ArchitectureDiagram';
import { NodeDetailsDrawer } from '../components/architecture/NodeDetailsDrawer';
import { Layers, Mic, Cpu, Database } from 'lucide-react';

export const ArchitecturePage = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
          <span className="badge badge-azure">
            <Layers size={12} />
            System Blueprint
          </span>
          <span className="badge badge-success">3-Layer Pipeline</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
          Technical Architecture
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Click any architectural node or simulate a live audio trace.
        </p>
      </div>

      {/* Main Diagram */}
      <div style={{ marginBottom: '2.5rem' }}>
        <ArchitectureDiagram />
      </div>

      {/* 3 Core Orchestration Layers */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div className="card" style={{ borderTop: '3px solid #0078D4', padding: '1.25rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
              <Mic size={16} color="#0078D4" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>1. Speech (STT/TTS)</h3>
            </div>
            <p style={{ fontSize: '0.78125rem', color: '#64748B', lineHeight: 1.45 }}>
              Azure AI Speech WebSocket streaming for Indic transcription and neural voice responses.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #7C3AED', padding: '1.25rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
              <Cpu size={16} color="#7C3AED" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>2. Reasoning LLM</h3>
            </div>
            <p style={{ fontSize: '0.78125rem', color: '#64748B', lineHeight: 1.45 }}>
              Azure OpenAI (GPT-4o) evaluates intent and synthesizes grounded answers.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #059669', padding: '1.25rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
              <Database size={16} color="#059669" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>3. Grounded RAG</h3>
            </div>
            <p style={{ fontSize: '0.78125rem', color: '#64748B', lineHeight: 1.45 }}>
              Azure AI Search dense vector index with Semantic Re-ranker over university circulars.
            </p>
          </div>
        </div>
      </div>

      <NodeDetailsDrawer />
    </div>
  );
};
