import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AboutPage } from './pages/AboutPage';
import { AssistantPage } from './pages/AssistantPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { KnowledgePage } from './pages/KnowledgePage';
import { TechnologyPage } from './pages/TechnologyPage';
import { SecurityPage } from './pages/SecurityPage';
import { TeamPage } from './pages/TeamPage';

const AppRouter = () => {
  const { currentRoute } = useApp();

  return (
    <main style={{ minHeight: 'calc(100vh - 68px - 340px)' }}>
      {currentRoute === 'about' && <AboutPage />}
      {currentRoute === 'assistant' && <AssistantPage />}
      {currentRoute === 'architecture' && <ArchitecturePage />}
      {currentRoute === 'knowledge' && <KnowledgePage />}
      {currentRoute === 'technology' && <TechnologyPage />}
      {currentRoute === 'security' && <SecurityPage />}
      {currentRoute === 'team' && <TeamPage />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
        <Navbar />
        <AppRouter />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
