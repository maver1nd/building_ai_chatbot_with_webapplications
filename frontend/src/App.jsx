import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HighlightsStrip from './components/HighlightsStrip';
import CampusLife from './components/CampusLife';
import Programmes from './components/Programmes';
import AdmissionsSection from './components/AdmissionsSection';
import NewsEvents from './components/NewsEvents';
import Footer from './components/Footer';
import ChatBotButton from './components/ChatBotButton';
import ChatPanel from './components/ChatPanel';
import './App.css';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialView, setChatInitialView] = useState('chat');
  const chatTriggerRef = useRef(null);

  const handleOpenChat = (view = 'chat') => {
    setChatInitialView(view);
    setIsChatOpen(true);
  };

  const handleOpenHistory = () => {
    handleOpenChat('history');
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handlePromptChat = (promptText) => {
    setIsChatOpen(true);
    // Give panel time to open and send the prompt
    setTimeout(() => {
      const textarea = document.querySelector('.chat-textarea');
      const sendBtn = document.querySelector('.send-msg-btn');
      if (textarea && sendBtn) {
        textarea.value = promptText;
        // Trigger React change
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
      }
    }, 200);
  };

  return (
    <div className="app-root-layout">
      {/* Top Navbar */}
      <Navbar onOpenChat={handleOpenChat} />

      <main className="main-content-flow">
        {/* Hero Section */}
        <Hero 
          onExploreClick={() => {}} 
          onKnowMoreClick={handleOpenChat}
        />

        {/* 6 Quick Icon Highlights Strip */}
        <HighlightsStrip 
          onSelectCategory={(catId) => {
            console.log('Selected category:', catId);
          }}
        />

        {/* Vibrant Campus Life Section (Replicated from Image) */}
        <CampusLife 
          onDiscoverMore={() => {
            const el = document.getElementById('academics');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Academic Programmes Section */}
        <Programmes onAskProgram={handlePromptChat} />

        {/* Admissions Roadmap Section */}
        <AdmissionsSection onAskAdmissions={handlePromptChat} />

        {/* Campus News & Events Section */}
        <NewsEvents onAskNews={handlePromptChat} />
      </main>

      {/* University Footer */}
      <Footer onOpenChat={handleOpenChat} />

      {/* Floating ChristBot Action Trigger Button with Halo Glow (ANI-01, ANI-02) */}
      <div ref={chatTriggerRef}>
        <ChatBotButton 
          isOpen={isChatOpen} 
          onClick={() => handleOpenChat('chat')} 
          onOpenHistory={handleOpenHistory}
        />
      </div>

      {/* Slide-in ChristBot Drawer / Panel (UI-01 to UI-11) */}
      <ChatPanel 
        isOpen={isChatOpen} 
        onClose={handleCloseChat} 
        triggerRef={chatTriggerRef}
        initialView={chatInitialView}
      />
    </div>
  );
}
