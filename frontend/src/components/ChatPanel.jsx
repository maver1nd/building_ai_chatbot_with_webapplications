import React, { useEffect, useRef, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { 
  getOrCreateSessionId, 
  sendMessage, 
  getChatHistory, 
  startNewChat,
  fetchPastSessions,
  saveSessionId
} from '../services/api';

export default function ChatPanel({ isOpen, onClose, triggerRef, initialView = 'chat' }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [lastUserMessage, setLastUserMessage] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [confirmNewChat, setConfirmNewChat] = useState(false);
  const [showHistoryView, setShowHistoryView] = useState(false);
  const [pastSessions, setPastSessions] = useState([]);
  const [loadingPastSessions, setLoadingPastSessions] = useState(false);

  const panelRef = useRef(null);

  // Synchronize initialView when panel opens
  useEffect(() => {
    if (isOpen) {
      if (initialView === 'history') {
        setShowHistoryView(true);
        loadPastSessions();
      } else {
        setShowHistoryView(false);
      }
    }
  }, [isOpen, initialView]);

  // Initialize session and fetch history
  useEffect(() => {
    const sid = getOrCreateSessionId();
    setSessionId(sid);
    
    // Load existing history if available (FR-CHAT-003)
    getChatHistory(sid).then((data) => {
      if (data && data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      }
    });
  }, []);

  // Keyboard accessibility: ESC closes panel (UI-03, UI-11)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap management (UI-11)
  useEffect(() => {
    if (isOpen && !showHistoryView) {
      const textarea = panelRef.current?.querySelector('textarea');
      setTimeout(() => textarea?.focus(), 150);
    } else if (!isOpen) {
      triggerRef?.current?.focus?.();
    }
  }, [isOpen, showHistoryView, triggerRef]);

  const loadPastSessions = async () => {
    setLoadingPastSessions(true);
    try {
      const data = await fetchPastSessions();
      if (data && data.sessions) {
        setPastSessions(data.sessions);
      }
    } catch (err) {
      console.warn('Failed loading past sessions', err);
    } finally {
      setLoadingPastSessions(false);
    }
  };

  const handleToggleHistory = () => {
    if (!showHistoryView) {
      loadPastSessions();
      setShowHistoryView(true);
    } else {
      setShowHistoryView(false);
    }
  };

  const handleSelectPastSession = async (chosenSessionId) => {
    setSessionId(chosenSessionId);
    saveSessionId(chosenSessionId);
    setShowHistoryView(false);
    setError(null);

    const data = await getChatHistory(chosenSessionId);
    if (data && data.messages) {
      setMessages(data.messages);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text || isTyping) return;

    setError(null);
    setLastUserMessage(text);

    // Optimistic UI update (FR-CHAT-001)
    const tempUserMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setIsTyping(true);

    try {
      const data = await sendMessage(sessionId, text);
      setIsTyping(false);

      if (data.reply) {
        const botReplyMsg = {
          id: data.message_id || Date.now() + 1,
          role: 'assistant',
          content: data.reply,
          created_at: data.created_at || new Date().toISOString()
        };
        setMessages((prev) => [...prev, botReplyMsg]);
      }
    } catch (err) {
      setIsTyping(false);
      setError(err.message || 'I am sorry, I am unable to respond right now. Please try again shortly.');
    }
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      setError(null);
      handleSendMessage(lastUserMessage);
    }
  };

  const handleNewChatClick = () => {
    if (messages.length > 0) {
      setConfirmNewChat(true);
    } else {
      performNewChat();
    }
  };

  const performNewChat = async () => {
    try {
      const res = await startNewChat(sessionId);
      if (res.session_id) {
        setSessionId(res.session_id);
      }
      setMessages([]);
      setError(null);
      setConfirmNewChat(false);
      setShowHistoryView(false);
    } catch (err) {
      console.error('Failed to reset session:', err);
      setConfirmNewChat(false);
    }
  };

  const formatSessionDate = (isoStr) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <>
      {/* Background Dim Overlay (UI-02) */}
      <div 
        className={`chat-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Chatbot Panel (UI-01, UI-02, UI-03) */}
      <section
        ref={panelRef}
        className={`chat-panel-sidebar ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="ChristBot Campus Assistant"
        aria-modal="true"
      >
        {/* Navy Header matching Screenshot */}
        <header className="chat-panel-header">
          <div className="header-brand-info">
            <div className="header-crest-circle">
              <img src="/logo_crest.svg" alt="Christ Crest" className="header-crest-img" />
            </div>
            <div className="header-text-block">
              <h2 className="header-bot-name">ChristBot</h2>
              <p className="header-bot-tagline">Your AI Assistant</p>
            </div>
          </div>

          <div className="header-action-controls">
            {/* Conversation History Toggle Button */}
            <button
              type="button"
              className={`header-ctrl-btn history-toggle-btn ${showHistoryView ? 'active' : ''}`}
              onClick={handleToggleHistory}
              aria-label="Toggle Conversation History"
              title={showHistoryView ? "Back to Chat" : "Conversation History"}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </button>

            {/* New Chat Button (UI-04 & FR-CHAT-005) */}
            <button
              type="button"
              className="header-ctrl-btn new-chat-btn"
              onClick={handleNewChatClick}
              aria-label="Start New Chat Session"
              title="Start New Chat"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </button>

            {/* Minimize Button */}
            <button
              type="button"
              className="header-ctrl-btn minimize-btn"
              onClick={onClose}
              aria-label="Minimize Chat Window"
              title="Minimize"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="header-ctrl-btn close-btn"
              onClick={onClose}
              aria-label="Close Chat Window"
              title="Close"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* New Chat Confirmation Dialog */}
        {confirmNewChat && (
          <div className="new-chat-confirm-modal">
            <p>Start a new chat session? The current conversation will be saved in your history.</p>
            <div className="confirm-btn-row">
              <button className="confirm-yes-btn" onClick={performNewChat}>
                Start New Chat
              </button>
              <button className="confirm-no-btn" onClick={() => setConfirmNewChat(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Dynamic View: History Panel vs. Active Message Flow */}
        {showHistoryView ? (
          <div className="conversation-history-panel">
            <div className="history-panel-header">
              <div className="history-header-title">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1F3A93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h3>Conversation History</h3>
              </div>
              <button 
                className="history-back-btn" 
                onClick={() => setShowHistoryView(false)}
              >
                ← Return to Chat
              </button>
            </div>

            <div className="history-sessions-list">
              {loadingPastSessions ? (
                <div className="history-loading-state">
                  <div className="typing-dots-wrapper">
                    <span className="typing-dot dot-1" />
                    <span className="typing-dot dot-2" />
                    <span className="typing-dot dot-3" />
                  </div>
                  <p>Loading your past conversations...</p>
                </div>
              ) : pastSessions.length === 0 ? (
                <div className="history-empty-state">
                  <p>No previous conversations found.</p>
                  <button className="history-start-first-btn" onClick={() => setShowHistoryView(false)}>
                    Start Your First Conversation
                  </button>
                </div>
              ) : (
                pastSessions.map((sess) => {
                  const isActive = sess.id === sessionId;
                  return (
                    <div 
                      key={sess.id}
                      className={`history-session-card ${isActive ? 'active-session' : ''}`}
                      onClick={() => handleSelectPastSession(sess.id)}
                    >
                      <div className="session-card-top">
                        <span className="session-snippet">{sess.snippet}</span>
                        {isActive && <span className="active-pill">Active</span>}
                      </div>
                      <div className="session-card-meta">
                        <span className="session-date">{formatSessionDate(sess.last_active_at)}</span>
                        <span className="session-count">{sess.message_count} {sess.message_count === 1 ? 'message' : 'messages'}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="history-panel-footer">
              <button className="history-new-session-btn" onClick={performNewChat}>
                + Start New Conversation
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Message Flow Area */}
            <MessageList
              messages={messages}
              isTyping={isTyping}
              error={error}
              onRetry={handleRetry}
              onChipClick={(chipText) => handleSendMessage(chipText)}
              onOpenHistory={() => {
                loadPastSessions();
                setShowHistoryView(true);
              }}
            />

            {/* Input Bar */}
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={confirmNewChat}
              isTyping={isTyping}
            />
          </>
        )}
      </section>
    </>
  );
}
