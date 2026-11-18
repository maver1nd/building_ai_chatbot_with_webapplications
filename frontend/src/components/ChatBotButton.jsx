import React, { useState } from 'react';
import { getAllSessionIds } from '../services/api';

export default function ChatBotButton({ isOpen, onClick, onOpenHistory }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  if (isOpen) {
    // Hidden when panel is open per FR-BOT-001
    return null;
  }

  const sessionIds = getAllSessionIds();
  const hasHistory = sessionIds.length > 0;

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      onClick();
    }, 200);
  };

  const handleHistoryClick = (e) => {
    e.stopPropagation();
    onOpenHistory && onOpenHistory();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="floating-bot-container">
      {/* Speech Bubble / Badge per Screenshot + History Entrance Shortcut */}
      <div className="bot-speech-cluster">
        {hasHistory && (
          <button 
            type="button"
            className="bot-past-chats-pill" 
            onClick={handleHistoryClick}
            title="View what you have previously interacted with"
            aria-label="View conversation history"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Past Chats ({sessionIds.length})</span>
          </button>
        )}

        <div className="bot-speech-badge" onClick={handleClick}>
          <span className="badge-sparkle sparkle-top">✨</span>
          <span className="badge-text">Chat with ChristBot</span>
          <div className="badge-tail" />
        </div>
      </div>

      {/* Floating Circular Button */}
      <button
        id="christbot-trigger-btn"
        className={`floating-bot-btn ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label="Open ChristBot AI Assistant"
        aria-haspopup="dialog"
      >
        {/* Animated Rotating Conic Halo (ANI-02) */}
        <div className="bot-glow-halo" />

        {/* Inner Button Body */}
        <div className="bot-btn-inner">
          <svg className="bot-chat-icon" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </button>
    </div>
  );
}
