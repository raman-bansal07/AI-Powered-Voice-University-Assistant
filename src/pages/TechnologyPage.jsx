import React, { useState } from 'react';
import { AZURE_SERVICES_DATA } from '../data/azureServicesData';
import { Cpu, CheckCircle2, Code2, ShieldCheck } from 'lucide-react';

export const TechnologyPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(AZURE_SERVICES_DATA[0].id);

  const selectedService =
    AZURE_SERVICES_DATA.find((s) => s.id === selectedServiceId) || AZURE_SERVICES_DATA[0];

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
          <span className="badge badge-azure">
            <Cpu size={12} />
            Cloud Architecture
          </span>
          <span className="badge badge-success">4 Core Azure Services</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
          Azure Services Stack
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Enterprise Azure AI cognitive services powering voice, search, reasoning, and security.
        </p>
      </div>

      {/* Master-Detail Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Service Selector Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #0078D4' : '1px solid #E2E8F0',
                  background: isSelected ? '#EFF6FF' : '#FFFFFF',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(0, 120, 212, 0.15)' : 'none',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#0078D4' : '#0F172A' }}>
                    {srv.name}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: '#64748B', marginTop: '1px' }}>
                    {srv.tagline}
                  </div>
                </div>
                <span className="badge" style={{ fontSize: '0.65rem', flexShrink: 0 }}>
                  {srv.slaMetrics.avgLatency}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Compact Detailed Specification */}
        <div
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                {selectedService.name}
              </h2>
              <span className="badge badge-azure">{selectedService.category}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
              {selectedService.roleInProject}
            </p>
          </div>

          {/* Key Specs Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              padding: '0.85rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B' }}>SLA</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#059669' }}>
                {selectedService.slaMetrics.availability}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B' }}>LATENCY</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0078D4' }}>
                {selectedService.slaMetrics.avgLatency}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B' }}>SCALE</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                {selectedService.slaMetrics.throughput}
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Highlights
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {selectedService.keyFeatures.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
                  <CheckCircle2 size={14} color="#0078D4" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.35rem' }}>
              <Code2 size={12} color="#0078D4" />
              <span>Integration SDK</span>
            </div>
            <pre
              style={{
                backgroundColor: '#0F172A',
                color: '#E2E8F0',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '0.725rem',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                lineHeight: 1.4,
              }}
            >
              <code>{selectedService.sampleCode}</code>
            </pre>
          </div>

          {/* Compliance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '0.6rem' }}>
            <ShieldCheck size={14} color="#059669" />
            <span>{selectedService.securityCompliance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
