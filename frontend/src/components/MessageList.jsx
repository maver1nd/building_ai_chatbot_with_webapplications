import React, { useEffect, useRef } from 'react';

export default function MessageList({ 
  messages, 
  isTyping, 
  error, 
  onRetry, 
  onChipClick,
  onOpenHistory 
}) {
  const messagesEndRef = useRef(null);

  const defaultChips = [
    "Admissions Info",
    "Courses & Programs",
    "Campus Facilities",
    "Events & Activities",
    "General Enquiry",
    "Talk to a Human"
  ];

  // Auto-scroll to newest message (SRS UI-05)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, error]);

  const formatMessageContent = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="msg-bullet-line">
            <span className="bullet-point">•</span>
            <span>{renderedLine}</span>
          </div>
        );
      }
      return <div key={idx} className="msg-text-line">{renderedLine}</div>;
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="message-list-area" role="log" aria-live="polite" aria-label="Conversation with ChristBot">
      {/* Background Architectural Campus Watermark */}
      <div className="campus-watermark-overlay" />

      {/* Default Welcome Message (UI-06) */}
      <div className="chat-message-row bot-row welcome-entrance">
        <div className="bot-avatar-circle" aria-hidden="true">
          <img src="/logo_crest.svg" alt="Christ Crest" className="bot-avatar-crest" />
        </div>
        <div className="bot-bubble-wrapper">
          <div className="chat-bubble bot-bubble">
            <p className="welcome-greeting"><strong>Hello! 👋</strong></p>
            <p className="welcome-body">
              I'm ChristBot, your virtual assistant for Christ University.
            </p>
            <p className="welcome-question">
              How can I help you today?
            </p>

            {/* Conversation History Entrance Shortcut for Returning Users */}
            {onOpenHistory && (
              <div className="welcome-history-shortcut">
                <button 
                  type="button" 
                  className="view-history-cta-btn" 
                  onClick={onOpenHistory}
                  title="View your previous conversations and interactions"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>View Previous Conversation History</span>
                  <span className="history-cta-arrow">→</span>
                </button>
              </div>
            )}
          </div>

          {/* Suggested Quick Question Chips per Screenshot */}
          {messages.length === 0 && (
            <div className="suggestion-chips-container" aria-label="Suggested Questions">
              {defaultChips.map((chip, idx) => (
                <button
                  key={idx}
                  className="quick-chip-btn"
                  onClick={() => onChipClick(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Messages History */}
      {messages.map((msg, index) => {
        const isUser = msg.role === 'user';
        return (
          <div 
            key={msg.id || index} 
            className={`chat-message-row ${isUser ? 'user-row' : 'bot-row'} message-fade-rise`}
          >
            {!isUser && (
              <div className="bot-avatar-circle" aria-hidden="true">
                <img src="/logo_crest.svg" alt="Christ Crest" className="bot-avatar-crest" />
              </div>
            )}
            <div className={`message-bubble-container ${isUser ? 'user-container' : 'bot-container'}`}>
              <div className={`chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
                {formatMessageContent(msg.content)}
              </div>
              <time className="message-timestamp">
                {formatTime(msg.created_at || new Date().toISOString())}
              </time>
            </div>
          </div>
        );
      })}

      {/* Animated 3-Dots Typing Indicator (SRS UI-08) */}
      {isTyping && (
        <div className="chat-message-row bot-row message-fade-rise" aria-label="ChristBot is thinking">
          <div className="bot-avatar-circle">
            <img src="/logo_crest.svg" alt="Christ Crest" className="bot-avatar-crest" />
          </div>
          <div className="chat-bubble bot-bubble typing-bubble">
            <div className="typing-dots-wrapper">
              <span className="typing-dot dot-1" />
              <span className="typing-dot dot-2" />
              <span className="typing-dot dot-3" />
            </div>
          </div>
        </div>
      )}

      {/* Inline Error State with Retry Button (SRS UI-10) */}
      {error && (
        <div className="chat-message-row bot-row message-fade-rise">
          <div className="chat-bubble error-bubble">
            <div className="error-content">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
            {onRetry && (
              <button className="error-retry-btn" onClick={onRetry}>
                ↻ Retry
              </button>
            )}
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
