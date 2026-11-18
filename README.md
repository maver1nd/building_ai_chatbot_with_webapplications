# Christ University Homepage with AI Campus Assistant (ChristBot)

A pixel-perfect recreation of the Christ (Deemed to be University) homepage with an integrated AI chatbot ("Campus Assistant" / "ChristBot"), developed strictly following the Software Requirements Specification (CUHCA-SRS-001) and the UI design specifications.

---

## 🏛️ System Features & Compliance

### 1. Replicated College Homepage UI
- **Navigation Header:** Christ University logo crest, links (Home, About, Academics, Admissions, Campus Life, Research, News & Events), Search button, and golden "Apply Now →" button.
- **Hero Showcase Carousel:** Campus architectural banner with iconic central tower, academic serif typography ("CHRIST (Deemed to be University) - Excellence and Service"), gold accent divider, description, "Explore Our Campus →", "Know More ▶", carousel navigation arrows, and pagination dots.
- **Highlights Strip:** 6 quick navigation icon cards:
  1. Academics
  2. Admissions
  3. Research
  4. Student Life
  5. Global Outreach
  6. Placements
- **"A Vibrant Campus Life" Section:**
  - Left column: Gold accent dash, heading, "Learn. Grow. Belong.", description, and "Discover More →" pill button.
  - Right column: 3 gallery cards (Central campus tower, Students collaborating outdoors, and Cultural dancers in costume).
- **Academic Programmes Section:** Interactive tab switcher for Undergraduate (UG), Postgraduate (PG), and Doctoral (Ph.D.) degrees.
- **Admissions 2026-2027 Section:** 4-step roadmap (Application, Entrance CUET, Skill Assessment & PI, Offer & Fees).
- **News & Campus Events:** Latest events (Admissions open, In-Bloom cultural fest, Placements).
- **University Footer:** Complete campus directories, helpline numbers, email addresses, and privacy disclaimer.

---

### 2. ChristBot (Campus Assistant) UI & Motion
- **Floating Button:** Circular floating button fixed on the right edge with a chat bubble icon.
- **Speech Bubble Tooltip:** "Chat with ChristBot" with yellow star sparkles.
- **CSS Glow Animations (ANI-01 to ANI-05):**
  - **Idle (ANI-01):** Subtle soft glow ring.
  - **Hover/Focus (ANI-02):** Rotating conic gradient halo (blue `#6A5CFF`, cyan `#00C2FF`, magenta `#FF4FD8`) with scale 1.08.
  - **Press (ANI-03):** 300ms pulse ripple before drawer opening.
  - **Reduced Motion (ANI-05):** `prefers-reduced-motion` compliance.
- **Slide-in Chat Panel (UI-01 to UI-11):**
  - Right-hand slide-in panel (400px width on desktop, full-width on mobile `<480px`).
  - Deep navy header with crest, "ChristBot", "Your AI Assistant", New Chat, Minimize, and Close buttons.
  - Background campus watermark illustration.
  - Warm greeting message: *"Hello! 👋 I'm ChristBot, your virtual assistant for Christ University. How can I help you today?"*
  - 6 Quick question suggestion chips (*Admissions Info*, *Courses & Programs*, *Campus Facilities*, *Events & Activities*, *General Enquiry*, *Talk to a Human*).
  - Multi-line input with Enter to send, Shift+Enter for newline, 1000-character limit counter, and send button.
  - 3 bouncing animated dots typing indicator.
  - Inline error bubble with retry mechanism.
  - Full keyboard accessibility and focus trap (`role="dialog"`, ESC key to close).

---

### 3. Backend & LLM Architecture (Django REST Framework)
- **Verbatim System Instruction (SRS Section 6.5):**
  > "The LLM-Chatbot AI will act as an University Representative and Campus Assistant, assisting university-related questions based on the college-data only, do not answer generally questions and never reveal its own identity. The persona of the bot should be warm, formal, cheerful and welcoming."
- **API Core:**
  - Primary Model: `gemini-3.5-flash`
  - Fallback Model: `gemini-3.5-flash-lite`
  - Extended Fallbacks: `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-flash`, and local Knowledge-Base grounded responder.
  - API Key: Securely stored and managed on the server side (never shipped to browser, NFR-SEC-001).
- **Database (SQLite):**
  - `ChatSession`: UUID-based anonymous session storage.
  - `ChatMessage`: Indexed session message history with role (`user` / `assistant`).
  - `KnowledgeEntry`: Categorized college knowledge base records managed via Django Admin.
- **Rate Limiting (NFR-SEC-003):**
  - 20 chat requests/minute per session.
  - 60 chat requests/minute per IP.

---

## 🚀 How to Run

### Quick Start (Unified Full-Stack)
```powershell
.\run.ps1
```
Or manually:
```powershell
cd backend
python manage.py migrate
python manage.py seed_kb
python manage.py runserver 127.0.0.1:8000
```
Then open:
- **Homepage & Chatbot:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Django Admin:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
  - **Username:** `admin`
  - **Password:** `admin123`

### Development Mode (Vite Hot-Reload)
In one terminal:
```powershell
cd backend
python manage.py runserver 127.0.0.1:8000
```
In a second terminal:
```powershell
cd frontend
npm run dev
```
Then open [http://localhost:5173/](http://localhost:5173/).

---

## 🧪 Verification & Automated Tests
To run the automated test suite verifying all 9 core SRS test cases (TC-CHAT-01 to TC-CHAT-03, TC-AI-01 to TC-AI-04, TC-SEC-01 to TC-SEC-03):
```powershell
cd backend
python manage.py test
```
Result: **9 passing tests in ~1.0s**.
