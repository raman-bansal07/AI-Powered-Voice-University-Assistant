import React from 'react';
import { TEAM_MEMBERS, PROJECT_DETAILS } from '../data/teamData';
import { Users, GraduationCap, Code2, ExternalLink } from 'lucide-react';

export const TeamPage = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
          <span className="badge badge-azure">
            <Users size={12} />
            Capstone Team
          </span>
          <span className="badge badge-success">2025–2026</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
          Authors & Engineering Team
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          {PROJECT_DETAILS.institution} • {PROJECT_DETAILS.department}
        </p>
      </div>

      {/* Team Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.rollNo}
            className="card card-hover"
            style={{
              padding: '1.5rem',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Avatar Circle */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: member.avatarBg,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: 800,
                marginBottom: '0.75rem',
              }}
            >
              {member.initials}
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1px' }}>
              {member.name}
            </h3>

            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0078D4', marginBottom: '0.2rem' }}>
              Roll: {member.rollNo}
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
              {member.role}
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.45, marginBottom: '0.75rem' }}>
              {member.bio}
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 8px', fontSize: '0.7rem' }}
              >
                <Code2 size={12} />
                <span>GitHub</span>
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 8px', fontSize: '0.7rem' }}
              >
                <ExternalLink size={12} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Metadata Card */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '14px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
          <GraduationCap size={18} color="#0078D4" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
            Capstone Project Details
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8125rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>INSTITUTION</div>
            <div style={{ fontWeight: 600, color: '#0F172A' }}>{PROJECT_DETAILS.institution}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>DEPARTMENT</div>
            <div style={{ fontWeight: 600, color: '#0F172A' }}>{PROJECT_DETAILS.department}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>COURSE & YEAR</div>
            <div style={{ fontWeight: 600, color: '#0F172A' }}>{PROJECT_DETAILS.course} • {PROJECT_DETAILS.academicYear}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>PROJECT MENTOR / GUIDE</div>
            <div style={{ fontWeight: 600, color: '#0078D4' }}>{PROJECT_DETAILS.professor}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
