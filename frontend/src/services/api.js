// API service for Christ University Campus Assistant
// SRS Section 7 & Section 6.3 (FR-CHAT-001, FR-CHAT-002, FR-CHAT-003, FR-CHAT-005, FR-CHAT-006)

const API_BASE_URL = '/api';

export function getOrCreateSessionId() {
  const STORAGE_KEY = 'cu_chat_session_uuid';
  const SESSIONS_LIST_KEY = 'cu_all_session_ids';
  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      sessionId = crypto.randomUUID();
    } else {
      sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    localStorage.setItem(STORAGE_KEY, sessionId);
    addSessionToHistoryList(sessionId);
  }
  return sessionId;
}

export function addSessionToHistoryList(sessionId) {
  const SESSIONS_LIST_KEY = 'cu_all_session_ids';
  try {
    let list = JSON.parse(localStorage.getItem(SESSIONS_LIST_KEY) || '[]');
    if (!list.includes(sessionId)) {
      list.unshift(sessionId);
      localStorage.setItem(SESSIONS_LIST_KEY, JSON.stringify(list.slice(0, 20)));
    }
  } catch {
    localStorage.setItem(SESSIONS_LIST_KEY, JSON.stringify([sessionId]));
  }
}

export function getAllSessionIds() {
  try {
    return JSON.parse(localStorage.getItem('cu_all_session_ids') || '[]');
  } catch {
    return [];
  }
}

export function saveSessionId(sessionId) {
  localStorage.setItem('cu_chat_session_uuid', sessionId);
  addSessionToHistoryList(sessionId);
}

export async function fetchPastSessions() {
  try {
    const ids = getAllSessionIds();
    const query = ids.length > 0 ? `?session_ids=${encodeURIComponent(ids.join(','))}` : '';
    const response = await fetch(`${API_BASE_URL}/chat/sessions/${query}`);
    if (!response.ok) return { sessions: [] };
    return await response.json();
  } catch (err) {
    console.warn('Failed to fetch past sessions:', err);
    return { sessions: [] };
  }
}

export async function sendMessage(sessionId, message) {
  const response = await fetch(`${API_BASE_URL}/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: message.trim(),
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send message');
  }
  return data;
}

export async function getChatHistory(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/history/?session_id=${encodeURIComponent(sessionId)}`);
    if (!response.ok) {
      return { messages: [] };
    }
    return await response.json();
  } catch (err) {
    console.warn('Could not fetch chat history:', err);
    return { messages: [] };
  }
}

export async function startNewChat(sessionId) {
  const response = await fetch(`${API_BASE_URL}/chat/new/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId }),
  });

  const data = await response.json();
  if (data.session_id) {
    saveSessionId(data.session_id);
  }
  return data;
}

export async function getHomeContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/home-content/`);
    if (!response.ok) throw new Error('Failed to fetch home content');
    return await response.json();
  } catch (err) {
    console.warn('Using local fallback for home content:', err);
    return null;
  }
}
