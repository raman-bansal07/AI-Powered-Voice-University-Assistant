import React, { useState } from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
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

export const Navbar: React.FC = () => {
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

  const navItems: { route: AppRoute; label: string; icon: React.ReactNode }[] = [
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
        {/* Brand: Strictly 1 Line */}
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
              style={{ gap: '4px' }}
              title="Select Speech Language"
            >
              <Globe size={13} color="#0078D4" />
              <span>{selectedLanguage.nativeName}</span>
              <ChevronDown size={11} color="#64748B" />
            </button>

            {isLangMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '190px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
                  zIndex: 250,
                  padding: '4px',
                  maxHeight: '280px',
                  overflowY: 'auto',
                }}
              >
                <div style={{ padding: '6px 8px', fontSize: '0.6875rem', color: '#64748B', fontWeight: 700 }}>
                  SPEECH LOCALE
                </div>
                {INDIAN_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguageCode(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 8px',
                      background: selectedLanguage.code === lang.code ? '#EFF6FF' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.8125rem',
                      color: selectedLanguage.code === lang.code ? '#0078D4' : '#1E293B',
                      fontWeight: selectedLanguage.code === lang.code ? 600 : 500,
                    }}
                  >
                    <span>{lang.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setIsRoleMenuOpen(!isRoleMenuOpen);
                setIsLangMenuOpen(false);
              }}
              style={{ gap: '4px' }}
              title="Microsoft Entra ID Role"
            >
              <UserCheck size={13} color={userRole === 'student' ? '#059669' : '#64748B'} />
              <span>{userRole === 'student' ? 'Student' : userRole === 'faculty' ? 'Faculty' : 'Guest'}</span>
              <ChevronDown size={11} color="#64748B" />
            </button>

            {isRoleMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '200px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
                  zIndex: 250,
                  padding: '6px',
                }}
              >
                <div style={{ padding: '4px 6px', fontSize: '0.6875rem', color: '#64748B', fontWeight: 700 }}>
                  ENTRA ID ROLE
                </div>
                {[
                  { role: 'student', label: 'Student', desc: 'GPA & fees' },
                  { role: 'guest', label: 'Guest', desc: 'Public info only' },
                  { role: 'faculty', label: 'Faculty', desc: 'Full admin access' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setUserRole(item.role as any);
                      setIsRoleMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'block',
                      padding: '6px 8px',
                      background: userRole === item.role ? '#EFF6FF' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      marginBottom: '2px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: userRole === item.role ? 600 : 500,
                        color: userRole === item.role ? '#0078D4' : '#0F172A',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-subtle btn-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'none' }}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            zIndex: 300,
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderTop: '1px solid #E2E8F0',
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
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                background: currentRoute === item.route ? '#EFF6FF' : 'transparent',
                color: currentRoute === item.route ? '#0078D4' : '#1E293B',
                border: 'none',
                borderRadius: '8px',
                textAlign: 'left',
                fontWeight: currentRoute === item.route ? 600 : 500,
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
