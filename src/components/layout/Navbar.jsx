import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LANGUAGES } from '../../data/indianLanguages';
import {
  Bot, Layers, Cpu, Users, Globe,
  Menu, X, ChevronDown, LayoutDashboard, ShieldCheck,
} from 'lucide-react';

// ── Custom logo SVG ──────────────────────────────────────────────
const LogoMark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Outer ring */}
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    {/* Inner ring */}
    <circle cx="12" cy="12" r="6" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
    {/* Core dot */}
    <circle cx="12" cy="12" r="2.5" fill="white"/>
    {/* Cross lines */}
    <line x1="12" y1="2"  x2="12" y2="6"  stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
    <line x1="12" y1="18" x2="12" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
    <line x1="2"  y1="12" x2="6"  y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
    <line x1="18" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
  </svg>
);

export const Navbar = () => {
  const {
    currentRoute,
    navigateTo,
    selectedLanguage,
    setSelectedLanguageCode,
    user,
    quotaInfo,
    openAuthModal,
    logoutUser
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setIsLangMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = [
    { route: 'about',        label: 'Overview',      icon: <LayoutDashboard size={13} /> },
    { route: 'assistant',    label: 'Voice AI',       icon: <Bot size={13} /> },
    { route: 'architecture', label: 'Architecture',   icon: <Layers size={13} /> },
    { route: 'technology',   label: 'Azure Stack',    icon: <Cpu size={13} /> },
    { route: 'team',         label: 'Team',           icon: <Users size={13} /> },
    { route: 'admin',        label: 'Admin',          icon: <ShieldCheck size={13} /> },
  ];

  const dropdownStyle = {
    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
    background: '#0B0F22',
    border: '1px solid rgba(99,120,200,0.2)',
    borderRadius: 14, padding: '6px', zIndex: 1000,
    boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.08)',
    minWidth: 230,
  };

  const dropHeaderStyle = {
    padding: '5px 10px 8px',
    fontSize: '0.6rem', fontWeight: 800,
    color: '#4A5580', letterSpacing: '0.1em', textTransform: 'uppercase',
    borderBottom: '1px solid rgba(99,120,200,0.1)', marginBottom: 4,
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">

        {/* ── Brand / Logo ─────────────────────────────── */}
        <div className="navbar-brand" onClick={() => navigateTo('about')} style={{ cursor: 'pointer' }}>
          <div style={{ position: 'relative' }}>
            <div className="brand-icon">
              <LogoMark size={22} />
            </div>
            <div style={{
              position: 'absolute', inset: -4,
              background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span className="brand-title">UniVoice</span>
            <span className="brand-sub">Azure AI · Multilingual</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(37,99,235,0.15)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 20, padding: '2px 8px',
            fontSize: '0.65rem', fontWeight: 700,
            color: '#60A5FA', letterSpacing: '0.03em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', flexShrink: 0 }}/>
            Live
          </div>
        </div>

        {/* ── Desktop Nav ───────────────────────────────── */}
        <nav className="nav-pills">
          {navItems.map(({ route, label, icon }) => (
            <button
              key={route}
              onClick={() => navigateTo(route)}
              className={`nav-pill-btn ${currentRoute === route ? 'active' : ''}`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* ── Right Controls ────────────────────────────── */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* User Auth Profile Badge or Sign In Trigger */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                background: user.role === 'student' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: user.role === 'student' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '20px',
                fontSize: '0.8rem'
              }}>
                <span>{user.role === 'student' ? '🎓' : '🌐'}</span>
                <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{user.name}</span>
                <span style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  color: quotaInfo.remaining_today > 0 ? '#38bdf8' : '#f87171',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}>
                  ⚡ {quotaInfo.remaining_today}/{quotaInfo.daily_limit}
                </span>
              </div>
              <button
                onClick={logoutUser}
                title="Log Out"
                className="btn btn-secondary btn-sm"
                style={{ padding: '5px 10px', fontSize: '0.75rem', color: '#94a3b8' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="btn btn-primary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                border: 'none',
                boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer'
              }}
            >
              <span>🔑</span>
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Language picker */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); }}
              style={{ gap: 5 }}
            >
              <Globe size={13} color="#60A5FA" />
              <span style={{ fontWeight: 600, color: '#E8EEFF' }}>{selectedLanguage.name}</span>
              <span style={{ color: '#4A5580', fontSize: '0.72rem' }}>({selectedLanguage.nativeName})</span>
              <ChevronDown size={11} color="#4A5580" />
            </button>

            {isLangMenuOpen && (
              <div style={dropdownStyle}>
                <div style={dropHeaderStyle}>Select Language</div>
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {INDIAN_LANGUAGES.map((lang) => {
                    const isActive = selectedLanguage.code === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => { setSelectedLanguageCode(lang.code); setIsLangMenuOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '7px 10px', borderRadius: 8,
                          border: 'none', cursor: 'pointer', textAlign: 'left',
                          fontFamily: 'var(--font-sans)',
                          background: isActive ? 'rgba(37,99,235,0.2)' : 'transparent',
                          color: isActive ? '#93C5FD' : '#8B9CC8',
                          fontWeight: isActive ? 700 : 400,
                          fontSize: '0.8125rem',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <div>
                          <div>{lang.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#4A5580' }}>{lang.nativeName}</div>
                        </div>
                        {isActive && <span style={{ color: '#3B82F6', fontSize: 14 }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="btn btn-secondary btn-sm mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'none', padding: '0.35rem 0.5rem' }}
          >
            {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>


      {/* ── Mobile Menu ──────────────────────────────── */}
      {isMobileMenuOpen && (
        <div style={{
          background: '#0B0F22', borderTop: '1px solid rgba(99,120,200,0.12)',
          padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          {navItems.map(({ route, label, icon }) => (
            <button
              key={route}
              onClick={() => { navigateTo(route); setIsMobileMenuOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0.65rem 0.9rem', borderRadius: 9,
                border: 'none', fontFamily: 'var(--font-sans)',
                background: currentRoute === route ? 'rgba(37,99,235,0.2)' : 'transparent',
                color: currentRoute === route ? '#93C5FD' : '#8B9CC8',
                fontWeight: currentRoute === route ? 700 : 400,
                fontSize: '0.875rem', cursor: 'pointer',
              }}
            >
              {icon}<span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
