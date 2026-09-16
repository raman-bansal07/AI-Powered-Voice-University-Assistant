import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArchitectureNode } from '../../types/architecture';
import { Badge } from '../common/Badge';
import {
  X,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Clock,
  Radio,
  Server,
} from 'lucide-react';

export const NodeDetailsDrawer: React.FC = () => {
  const { activeArchitectureNode, setActiveArchitectureNode } = useApp();

  if (!activeArchitectureNode) return null;

  const node = activeArchitectureNode;

  return (
    <div className="drawer-backdrop" onClick={() => setActiveArchitectureNode(null)}>
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A' }}>
                {node.label}
              </h3>
              {node.azureService && (
                <Badge variant="azure">
                  {node.azureService}
                </Badge>
              )}
            </div>
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>{node.subtitle}</span>
          </div>

          <button
            onClick={() => setActiveArchitectureNode(null)}
            className="btn btn-subtle btn-sm"
            style={{ padding: '0.35rem' }}
            aria-label="Close Architecture Node Details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> LATENCY SLA
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0078D4' }}>{node.latencySla}</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Server size={12} /> LAYER TYPE
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase' }}>
              {node.layer}
            </div>
          </div>
        </div>

        {/* Overview & Role */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Architectural Role
          </div>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {node.description}
          </p>
          <div
            style={{
              background: '#F1F5F9',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: '#1E293B',
            }}
          >
            <strong>Technical Function:</strong> {node.technicalRole}
          </div>
        </div>

        {/* Data Contracts (In & Out) */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Data Flow In
            </div>
            <div style={{ fontSize: '0.8125rem', background: '#F8FAFC', padding: '0.625rem', borderRadius: '6px', border: '1px solid #E2E8F0', color: '#475569' }}>
              {node.dataFlowIn}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Data Flow Out
            </div>
            <div style={{ fontSize: '0.8125rem', background: '#F8FAFC', padding: '0.625rem', borderRadius: '6px', border: '1px solid #E2E8F0', color: '#475569' }}>
              {node.dataFlowOut}
            </div>
          </div>
        </div>

        {/* Sample Payload or Code Snippet */}
        {node.sdkCodeSnippet && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Code2 size={13} color="#0078D4" />
              <span>Azure SDK Implementation (Node.js)</span>
            </div>
            <pre className="code-view" style={{ fontSize: '0.75rem', maxHeight: '200px' }}>
              <code>{node.sdkCodeSnippet}</code>
            </pre>
          </div>
        )}

        {node.samplePayloadOut && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Sample JSON Payload Output
            </div>
            <pre className="code-view" style={{ fontSize: '0.75rem' }}>
              <code>{JSON.stringify(node.samplePayloadOut, null, 2)}</code>
            </pre>
          </div>
        )}

        {/* Downstream Connections */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Direct Downstream Dependencies
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {node.connectionsTo.length > 0 ? (
              node.connectionsTo.map((conn) => (
                <span
                  key={conn}
                  style={{
                    fontSize: '0.75rem',
                    background: '#E2E8F0',
                    color: '#334155',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {conn}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Terminal Node (Execution Boundary)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
