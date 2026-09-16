import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types/assistant';
import { Badge } from '../common/Badge';
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  FileText,
  AlertCircle,
} from 'lucide-react';

export const RbacSimulator: React.FC = () => {
  const { userRole, setUserRole } = useApp();

  const mockJwts: Record<UserRole, { header: any; payload: any }> = {
    guest: {
      header: { alg: 'none', typ: 'JWT' },
      payload: {
        iss: 'https://login.microsoftonline.com/university-tenant',
        sub: 'anonymous-session-991',
        role: 'Guest.Public',
        aud: 'https://univ-assistant-api.azurewebsites.net',
        exp: 1773660000,
      },
    },
    student: {
      header: { alg: 'RS256', typ: 'JWT', kid: 'entra-key-2025' },
      payload: {
        iss: 'https://login.microsoftonline.com/university-tenant',
        sub: 'stu_4019_rajesh',
        name: 'Rajesh Varma (Student)',
        email: 'r.varma.22cs@university.edu.in',
        role: 'Student.Enrolled',
        department: 'CSE',
        semester: 6,
        cgpaAccess: true,
        feeReceiptsAccess: true,
        aud: 'https://univ-assistant-api.azurewebsites.net',
        exp: 1773663600,
      },
    },
    faculty: {
      header: { alg: 'RS256', typ: 'JWT', kid: 'entra-key-2025' },
      payload: {
        iss: 'https://login.microsoftonline.com/university-tenant',
        sub: 'fac_102_prof_sharma',
        name: 'Dr. A. K. Sharma (Faculty)',
        email: 'ak.sharma.cse@university.edu.in',
        role: 'Faculty.AcademicOfficer',
        department: 'CSE',
        gradeSubmissionAccess: true,
        curriculumEditAccess: true,
        aud: 'https://univ-assistant-api.azurewebsites.net',
        exp: 1773663600,
      },
    },
  };

  const currentJwt = mockJwts[userRole];

  const permissionsMatrix = [
    { resource: 'Public Academic Regulations & Timetables', guest: true, student: true, faculty: true },
    { resource: 'Official Examination Dates & Fee Circulars', guest: true, student: true, faculty: true },
    { resource: 'Personal Attendance Calculation & Shortage Warning', guest: false, student: true, faculty: true },
    { resource: 'Personal Semester Fee Dues & Payment Gateway Deep-Link', guest: false, student: true, faculty: false },
    { resource: 'Digitized QR-coded Hall Ticket Download', guest: false, student: true, faculty: true },
    { resource: 'Internal Assessment Marks Entry & Moderation', guest: false, student: false, faculty: true },
    { resource: 'Disciplinary Committee Confidential Reports', guest: false, student: false, faculty: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Role Switcher Selector */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="#0078D4" />
          <span>Interactive Microsoft Entra ID Role Simulator</span>
        </div>
        <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1.25rem' }}>
          Select an identity persona to simulate how the Assistant dynamically verifies OAuth2 / OIDC claims before querying private endpoints:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            {
              role: 'guest',
              title: 'Guest / Public User',
              subtitle: 'Anonymous Session (No Entra ID Login)',
              desc: 'Restricted to public documents. Private student data is blocked.',
            },
            {
              role: 'student',
              title: 'Enrolled Student',
              subtitle: 'OAuth2 Authenticated (Student.Enrolled)',
              desc: 'Authorized to view personal attendance, fee balance, and download hall ticket.',
            },
            {
              role: 'faculty',
              title: 'Faculty / COE Official',
              subtitle: 'High Privilege (Faculty.AcademicOfficer)',
              desc: 'Authorized for department grade rosters and examination management.',
            },
          ].map((item) => {
            const isSelected = userRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => setUserRole(item.role as UserRole)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #0078D4' : '1px solid #CBD5E1',
                  backgroundColor: isSelected ? '#EBF3FC' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isSelected ? '#0078D4' : '#0F172A' }}>
                    {item.title}
                  </span>
                  {isSelected ? <Lock size={16} color="#0078D4" /> : <Unlock size={16} color="#94A3B8" />}
                </div>
                <div style={{ fontSize: '0.75rem', color: isSelected ? '#0078D4' : '#64748B', fontWeight: 500 }}>
                  {item.subtitle}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Breakdown: Token Claims vs Permission Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Token Claims JSON */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <KeyRound size={16} color="#0078D4" />
            <span>Active Microsoft Entra ID JWT Claims</span>
          </div>
          <pre className="code-view" style={{ fontSize: '0.75rem', maxHeight: '280px' }}>
            <code>{JSON.stringify(currentJwt.payload, null, 2)}</code>
          </pre>
        </div>

        {/* Permissions Table */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.75rem' }}>
            Resource Access Authorization Matrix
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {permissionsMatrix.map((item, idx) => {
              const isAllowed =
                userRole === 'student' ? item.student : userRole === 'faculty' ? item.faculty : item.guest;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    backgroundColor: isAllowed ? '#F0FDF4' : '#FEF2F2',
                    border: isAllowed ? '1px solid #DCFCE7' : '1px solid #FEE2E2',
                    fontSize: '0.75rem',
                  }}
                >
                  <span style={{ color: '#1E293B', fontWeight: 500 }}>{item.resource}</span>
                  <span
                    style={{
                      color: isAllowed ? '#166534' : '#991B1B',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {isAllowed ? 'Authorized' : 'Denied (401)'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
