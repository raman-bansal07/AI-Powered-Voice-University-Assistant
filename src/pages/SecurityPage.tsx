import React from 'react';
import { RbacSimulator } from '../components/security/RbacSimulator';
import { ShieldCheck, Lock, EyeOff, Server, FileCheck } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '1.5rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
          <span className="badge badge-azure">
            <ShieldCheck size={12} />
            Security & Zero-Trust
          </span>
          <span className="badge badge-success">Microsoft Entra ID Protected</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
          Security & Access Governance
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
          Student records (GPA, fee receipts, attendance) are guarded behind Microsoft Entra ID OAuth2 / OIDC token boundaries with zero data leakage.
        </p>
      </div>

      {/* 1. Interactive RBAC Simulator */}
      <div style={{ marginBottom: '2.5rem' }}>
        <RbacSimulator />
      </div>

      {/* 2. Zero-Trust Security Pillars */}
      <div>
        <div className="section-header" style={{ marginBottom: '1.25rem' }}>
          <div className="section-tag">GOVERNANCE CONTROLS</div>
          <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Zero-Trust Architecture Pillars</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {[
            {
              icon: <Lock size={20} color="#0078D4" />,
              title: 'OAuth2 & OIDC Token Validation',
              desc: 'Every tool request validates signed JWT tokens against Microsoft Entra ID RSA keys.',
            },
            {
              icon: <EyeOff size={20} color="#7C3AED" />,
              title: 'PII Scrubbing & Redaction',
              desc: 'Student identifiers and phone numbers are masked before model synthesis.',
            },
            {
              icon: <Server size={20} color="#059669" />,
              title: 'Azure Isolated VNet Peering',
              desc: 'Functions and databases communicate via private endpoints without public internet exposure.',
            },
            {
              icon: <FileCheck size={20} color="#D97706" />,
              title: 'Zero Training Retention',
              desc: 'University documents and voice inputs are never stored or used for model training.',
            },
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
