import React, { useState } from 'react';
import { AZURE_SERVICES_DATA } from '../data/azureServicesData';
import { Cpu, CheckCircle2, Code2, Clock, Lock } from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(AZURE_SERVICES_DATA[0].id);

  const selectedService =
    AZURE_SERVICES_DATA.find((s) => s.id === selectedServiceId) || AZURE_SERVICES_DATA[0];

  return (
    <div className="container" style={{ padding: '1.5rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
          <span className="badge badge-azure">
            <Cpu size={12} />
            Cloud Engineering
          </span>
          <span className="badge badge-success">7 Core Azure Services</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
          Azure Services Stack
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
          Select an Azure service to inspect its architectural role, latency SLA, security controls, and Node.js SDK code snippet.
        </p>
      </div>

      {/* Master-Detail Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Service Selector Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {AZURE_SERVICES_DATA.map((srv) => {
            const isSelected = selectedService.id === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid #0078D4' : '1px solid #E2E8F0',
                  background: isSelected ? '#EFF6FF' : '#FFFFFF',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#0078D4' : '#0F172A' }}>
                    {srv.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {srv.tagline}
                  </div>
                </div>
                <span className="badge" style={{ fontSize: '0.6875rem', flexShrink: 0 }}>
                  {srv.slaMetrics.avgLatency}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Specification */}
        <div
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '0.4rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>
                {selectedService.name}
              </h2>
              <span className="badge badge-azure">{selectedService.category}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55 }}>
              {selectedService.roleInProject}
            </p>
          </div>

          {/* Key Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                <Clock size={12} />
                <span>LATENCY SLA</span>
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#059669' }}>
                {selectedService.slaMetrics.avgLatency}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                <Lock size={12} />
                <span>SECURITY LEVEL</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0078D4' }}>
                {selectedService.securityCompliance}
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>
              Key Features & Capabilities
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.4rem' }}>
              {selectedService.keyFeatures.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
                  <CheckCircle2 size={13} color="#059669" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet */}
          {selectedService.sampleCode && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>
                <Code2 size={14} color="#0078D4" />
                <span>Azure SDK Code Snippet</span>
              </div>
              <pre className="code-view">
                <code>{selectedService.sampleCode}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
