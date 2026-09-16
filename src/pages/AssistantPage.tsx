import React from 'react';
import { VoiceController } from '../components/assistant/VoiceController';
import { ConversationFeed } from '../components/assistant/ConversationFeed';
import { ErrorFallbackSimulator } from '../components/assistant/ErrorFallbackSimulator';
import { CitationDrawer } from '../components/assistant/CitationDrawer';
import { Bot, ShieldCheck } from 'lucide-react';

export const AssistantPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '1.5rem 1rem 4rem 1rem', maxWidth: '960px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
          <span className="badge badge-azure">
            <Bot size={12} />
            Interactive Voice AI
          </span>
          <span className="badge badge-success">
            <ShieldCheck size={12} />
            Foundry Agent Active
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
          University Voice Assistant
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
          Speak or type in any Indian language. Answers are retrieved in real-time with verified citations from official regulations.
        </p>
      </div>

      {/* 1. Voice Controller */}
      <VoiceController />

      {/* 2. Conversation Stream */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>
            Live Conversation Stream & Citations
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Azure OpenAI & AI Search
          </span>
        </div>
        <ConversationFeed />
      </div>

      {/* 3. Reliability Simulator */}
      <ErrorFallbackSimulator />

      {/* Citation Inspector Drawer */}
      <CitationDrawer />
    </div>
  );
};
