import React from 'react';
import { PROJECT_METADATA, EVALUATION_CRITERIA, TEAM_MEMBERS } from '../data/teamData';
import { Users, CheckCircle2 } from 'lucide-react';

export const TeamPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '1.5rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
          <span className="badge badge-azure">
            <Users size={12} />
            Academic Portal
          </span>
          <span className="badge badge-success">Capstone 2025–2026</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
          Project Evaluation & Team
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
          Assessment criteria and team contributions prepared for the evaluation committee.
        </p>
      </div>

      {/* Project Metadata Card */}
      <div
        style={{
          background: '#0F172A',
          color: '#FFFFFF',
          borderRadius: '14px',
          padding: '1.5rem 1.75rem',
          marginBottom: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.6875rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
            PROJECT TITLE
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
            {PROJECT_METADATA.projectTitle}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
            INSTITUTION
          </div>
          <div style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>
            {PROJECT_METADATA.institution}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
            SUPERVISOR
          </div>
          <div style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>
            {PROJECT_METADATA.supervisor}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
            PLATFORM
          </div>
          <div style={{ fontSize: '0.875rem', color: '#4ADE80', fontWeight: 600 }}>
            {PROJECT_METADATA.cloudPlatform}
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <div className="section-tag">CONTRIBUTORS</div>
          <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Development Team</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--azure-gradient)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  {member.avatarInitial}
                </div>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>{member.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#0078D4', fontWeight: 500 }}>{member.role}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.5rem' }}>
                {member.specialization}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45 }}>
                {member.responsibilities[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluation Rubric */}
      <div>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <div className="section-tag">ASSESSMENT RUBRIC</div>
          <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Evaluation Criteria (100 Marks)</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {EVALUATION_CRITERIA.map((crit) => (
            <div
              key={crit.id}
              className="card"
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: '1 1 300px' }}>
                <CheckCircle2 size={18} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>
                    {crit.title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '2px' }}>
                    {crit.description}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="badge badge-azure" style={{ fontSize: '0.8125rem', fontWeight: 700, padding: '0.3rem 0.65rem' }}>
                  {crit.weightage}
                </span>
                <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                  {crit.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
