import React from 'react';
import { ArchitectureDiagram } from '../components/architecture/ArchitectureDiagram';
import { NodeDetailsDrawer } from '../components/architecture/NodeDetailsDrawer';
import { Layers, Mic, Cpu, Volume2 } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '1.5rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
          <span className="badge badge-azure">
            <Layers size={12} />
            System Blueprint
          </span>
          <span className="badge badge-success">3-Layer Decoupled Cloud Architecture</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
          Technical Architecture & Cloud Pipeline
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>
          Interactive end-to-end cloud pipeline. Click any architectural node to inspect data contracts, latency metrics, and Azure SDK code snippets.
        </p>
      </div>

      {/* Main Interactive Diagram */}
      <div style={{ marginBottom: '3rem' }}>
        <ArchitectureDiagram />
      </div>

      {/* 3 Core Orchestration Layers */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="section-header" style={{ marginBottom: '1.25rem' }}>
          <div className="section-tag">ENGINEERING BREAKDOWN</div>
          <h2 className="section-title" style={{ fontSize: '1.4rem' }}>The Three Orchestration Layers</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ borderTop: '3px solid #0078D4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
              <Mic size={18} color="#0078D4" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>1. Speech-to-Text (STT)</h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Streams 16kHz PCM audio over WebSockets to <strong>Azure AI Speech</strong> with fast Indic dialect transcription.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>• <strong>Latency:</strong> &lt; 140ms first-chunk</div>
              <div>• <strong>Dialects:</strong> Hindi, Tamil, Telugu, Marathi</div>
            </div>
          </div>

          <div className="card" style={{ borderTop: '3px solid #7C3AED' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
              <Cpu size={18} color="#7C3AED" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>2. Reasoning & Grounded RAG</h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              <strong>Microsoft Foundry Agent</strong> executes ReAct loops, retrieving vector chunks from <strong>Azure AI Search</strong>.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>• <strong>Model:</strong> GPT-4o with strict grounding</div>
              <div>• <strong>Tools:</strong> Serverless ERP Action calls</div>
            </div>
          </div>

          <div className="card" style={{ borderTop: '3px solid #059669' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
              <Volume2 size={18} color="#059669" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>3. Neural Speech Output (TTS)</h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Converts Markdown response tokens into SSML audio streams with Indic neural voices.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>• <strong>Audio:</strong> 24kHz Neural MP3 stream</div>
              <div>• <strong>Start Latency:</strong> &lt; 110ms playback</div>
            </div>
          </div>
        </div>
      </div>

      {/* Latency Telemetry Table */}
      <div className="card" style={{ padding: '1.5rem', borderRadius: '14px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
            End-to-End Latency Telemetry
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Measured across Azure Central India & East US nodes.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                <th style={{ padding: '0.5rem 0.75rem' }}>Stage</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>Azure Service</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>Avg Latency</th>
                <th style={{ padding: '0.5rem 0.75rem' }}>Protocol</th>
              </tr>
            </thead>
            <tbody>
              {[
                { stage: '1. Audio Capture & STT', service: 'Azure AI Speech STT', lat: '142ms', proto: 'WebSocket PCM' },
                { stage: '2. Node Gateway Dispatch', service: 'Azure App Service', lat: '38ms', proto: 'Node.js Fastify' },
                { stage: '3. Agent Reasoning & RAG', service: 'Foundry IQ + AI Search', lat: '185ms', proto: 'Vector Cosine + HNSW' },
                { stage: '4. Serverless ERP Tool Call', service: 'Azure Functions', lat: '65ms', proto: 'Managed Identity' },
                { stage: '5. Neural Voice Synthesis', service: 'Azure AI Speech TTS', lat: '110ms', proto: 'Audio Buffer Stream' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600, color: '#0F172A' }}>{row.stage}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#0078D4' }}>{row.service}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#059669', fontWeight: 600 }}>{row.lat}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>{row.proto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Node Details Drawer */}
      <NodeDetailsDrawer />
    </div>
  );
};
