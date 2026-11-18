import React, { useState, useRef, useEffect } from 'react';

export default function MessageInput({ onSendMessage, disabled, isTyping }) {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed || disabled || isTyping) return;
    if (trimmed.length > 1000) return;
    
    onSendMessage(trimmed);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isSendDisabled = !inputText.trim() || disabled || isTyping || inputText.length > 1000;

  return (
    <div className="message-input-area">
      <div className="input-bar-container">
        {/* Paperclip attachment icon per screenshot */}
        <button 
          type="button" 
          className="attachment-btn" 
          aria-label="Attach File (Not enabled in demo)"
          title="Campus Assistant is in text-only mode"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>

        {/* Text Input Field */}
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Type your message..."
          rows="1"
          maxLength={1000}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Message text"
        />

        {/* Send Button */}
        <button
          type="button"
          className={`send-msg-btn ${isSendDisabled ? 'disabled' : ''}`}
          onClick={handleSend}
          disabled={isSendDisabled}
          aria-label="Send Message"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>

      {/* Input Meta Row: Character Counter + Powered By Footer */}
      <div className="input-meta-row">
        {inputText.length > 800 && (
          <span className={`char-counter ${inputText.length > 950 ? 'near-limit' : ''}`}>
            {inputText.length}/1000
          </span>
        )}
        <div className="powered-by-brand">
          Powered by Christ University <span className="heart-icon">❤️</span>
        </div>
      </div>
    </div>
  );
}
