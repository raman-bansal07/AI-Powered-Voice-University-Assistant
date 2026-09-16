import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LANGUAGES } from '../../data/indianLanguages';
import {
  Bot,
  Layers,
  Search,
  Cpu,
  Shield,
  Users,
  Sparkles,
  Globe,
  UserCheck,
  Menu,
  X,
  ChevronDown,
  Info,
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentRoute,
    navigateTo,
    selectedLanguage,
    setSelectedLanguageCode,
    userRole,
    setUserRole,
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { route: 'about', label: 'Overview', icon: <Info size={14} /> },
    { route: 'assistant', label: 'Voice AI', icon: <Bot size={14} /> },
    { route: 'architecture', label: 'Architecture', icon: <Layers size={14} /> },
    { route: 'knowledge', label: 'Knowledge', icon: <Search size={14} /> },
    { route: 'technology', label: 'Azure Stack', icon: <Cpu size={14} /> },
    { route: 'security', label: 'Security', icon: <Shield size={14} /> },
    { route: 'team', label: 'Team', icon: <Users size={14} /> },
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand */}
        <div
          className="navbar-brand"
          onClick={() => navigateTo('about')}
        >
          <div className="brand-icon">
            <Sparkles size={16} />
          </div>
          <span className="brand-title">UnivAI</span>
          <span className="badge badge-azure" style={{ fontSize: '0.7rem', padding: '1px 7px' }}>
            Azure AI
          </span>
        </div>

        {/* Desktop Segmented Pill Navigation */}
        <nav className="nav-pills">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              className={`nav-pill-btn ${currentRoute === item.route ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Tools: Language Picker & Role Selector */}
        <div className="navbar-right">
          {/* Language Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsRoleMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.4rem 0.75rem',
                fontSize: '0.8125rem',
              }}
              title="Select Indic Language"
            >
              <Globe size={14} color="#0078D4" />
              <span style={{ fontWeight: 600 }}>{selectedLanguage.name}</span>
              <span style={{ fontSize: '0.7rem', color: '#64748B' }}>({selectedLanguage.nativeName})</span>
              <ChevronDown size={12} />
            </button>

            {isLangMenuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '260px',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  padding: '0.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ padding: '4px 8px', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em' }}>
                  10+ INDIC NEURAL LOCALES
                </div>
                {INDIAN_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguageCode(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: selectedLanguage.code === lang.code ? '#EFF6FF' : 'transparent',
                      color: selectedLanguage.code === lang.code ? '#0078D4' : '#1E293B',
                      fontWeight: selectedLanguage.code === lang.code ? 700 : 500,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div>{lang.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{lang.nativeName} • {lang.region}</div>
                    </div>
                    {selectedLanguage.code === lang.code && (
                      <span style={{ fontSize: '0.7rem', color: '#0078D4', fontWeight: 700 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Dropdown (Entra ID Simulation) */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setIsRoleMenuOpen(!isRoleMenuOpen);
                setIsLangMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.4rem 0.75rem',
                fontSize: '0.8125rem',
              }}
              title="Simulate Microsoft Entra ID Role"
            >
              <UserCheck size={14} color="#059669" />
              <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{userRole}</span>
              <ChevronDown size={12} />
            </button>

            {isRoleMenuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '240px',
                  zIndex: 1000,
                  padding: '0.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ padding: '4px 8px', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em' }}>
                  MICROSOFT ENTRA ID RBAC
                </div>
                {[
                  { role: 'student', title: 'Student (Enrolled)', desc: 'Full access to academic & fee records' },
                  { role: 'faculty', title: 'Faculty / Staff', desc: 'Curriculum & departmental policies' },
                  { role: 'guest', title: 'Guest / Prospective', desc: 'Public ordinances & admissions only' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setUserRole(item.role);
                      setIsRoleMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: userRole === item.role ? '#ECFDF5' : 'transparent',
                      color: userRole === item.role ? '#059669' : '#1E293B',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '0.8125rem', fontWeight: userRole === item.role ? 700 : 600 }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-secondary btn-sm mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'none', padding: '0.4rem' }}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => {
                navigateTo(item.route);
                setIsMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                border: 'none',
                background: currentRoute === item.route ? '#EFF6FF' : 'transparent',
                color: currentRoute === item.route ? '#0078D4' : '#334155',
                fontWeight: currentRoute === item.route ? 700 : 500,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
