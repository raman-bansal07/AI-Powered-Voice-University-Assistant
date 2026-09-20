# ?? AI-Powered Multilingual Voice University Assistant

> **UniVoice** — An intelligent, voice-first university assistant that understands 10+ Indian languages, powered by **Sarvam AI** (STT/TTS) + **Azure OpenAI** (GPT-4o-mini) + **Azure AI Search** (RAG), with a beautiful React 19 frontend.

---

## ??? Project Architecture

```
MicrosoftAzure/
+-- backend/                        # FastAPI Python Backend
¦   +-- app/
¦   ¦   +-- main.py                 # FastAPI app entry point + CORS + global error handler
¦   ¦   +-- config.py               # Centralised settings (Pydantic BaseSettings + .env)
¦   ¦   +-- routers/
¦   ¦   ¦   +-- chat.py             # POST /api/chat  — text query ? agent response
¦   ¦   ¦   +-- voice.py            # POST /api/voice — audio upload ? STT ? agent ? TTS
¦   ¦   ¦   +-- tools.py            # GET  /api/tools — tool registry listing
¦   ¦   +-- services/
¦   ¦   ¦   +-- agent_service.py    # Core orchestrator (5-step pipeline)
¦   ¦   ¦   +-- sarvam_service.py   # Sarvam AI STT (saaras:v2) + TTS (bulbul:v2)
¦   ¦   ¦   +-- azure_openai_service.py # Azure OpenAI GPT-4o-mini response gen
¦   ¦   ¦   +-- rag_service.py      # Azure AI Search + local keyword fallback RAG
¦   ¦   ¦   +-- intent_guardrail.py # Out-of-scope query filter (10 languages)
¦   ¦   +-- tools/
¦   ¦   ¦   +-- university_tools.py # 4 core dynamic tools (overview, library, faculty, fees)
¦   ¦   ¦   +-- mock_db.py          # In-memory mock university database
¦   ¦   ¦   +-- setup_azure_search.py # Azure AI Search index setup script
¦   ¦   +-- data/
¦   ¦       +-- university_rulebook.py # Ordinance docs for RAG (attendance, hostel, etc.)
¦   +-- requirements.txt
¦   +-- run.py                      # Backend launcher (uvicorn)
¦   +-- .env                        # API keys (not committed to git)
¦
+-- src/                            # React 19 Frontend (Vite)
¦   +-- App.jsx                     # Root app with client-side router
¦   +-- main.jsx                    # React DOM entry
¦   +-- index.css                   # Global design system tokens + animations
¦   +-- context/
¦   ¦   +-- AppContext.jsx          # Global state: route, language, voice mode
¦   +-- pages/
¦   ¦   +-- AssistantPage.jsx       # Main voice/text chat interface
¦   ¦   +-- AboutPage.jsx           # Project overview & feature highlights
¦   ¦   +-- ArchitecturePage.jsx    # System architecture diagram
¦   ¦   +-- KnowledgePage.jsx       # RAG knowledge base viewer
¦   ¦   +-- TechnologyPage.jsx      # Tech stack deep-dive
¦   ¦   +-- SecurityPage.jsx        # Security & privacy page
¦   ¦   +-- TeamPage.jsx            # Team members page
¦   +-- components/
¦       +-- layout/
¦       ¦   +-- Navbar.jsx          # Top navigation bar
¦       ¦   +-- Footer.jsx          # Site footer
¦       +-- assistant/
¦       ¦   +-- CitationDrawer.jsx  # Slide-out citations/sources panel
¦       +-- architecture/
¦       +-- common/
¦       +-- knowledge/
¦       +-- security/
¦
+-- index.html
+-- vite.config.js
+-- package.json
+-- run.py                          # Root launcher
+-- serve.js                        # Static file server for production dist
+-- test_azure_services.py          # Azure connectivity test (Speech, OpenAI, Search)
+-- test_openai_endpoint.py         # Standalone OpenAI endpoint test
```

---

## ? What Has Already Been Built

### Backend (FastAPI)

| Component | Status | Description |
|---|---|---|
| FastAPI App | ? Done | App with CORS, global exception handler, /api/health |
| Config System | ? Done | Pydantic BaseSettings loading from .env |
| Sarvam STT | ? Done | saaras:v2 model — audio to text in 10+ Indian languages |
| Sarvam TTS | ? Done | bulbul:v2 model — text to base64 audio in target language |
| Intent Guardrail | ? Done | Keyword-based off-topic filter with polite redirects in 10 languages |
| Agent Orchestrator | ? Done | 5-step pipeline: Guardrail ? Route ? Tool/RAG ? LLM ? TTS |
| Tool: University Overview | ? Done | Rankings (NIRF #12, NAAC A++), campus info, contact |
| Tool: Library Status | ? Done | Book availability, rack/shelf location, e-book links |
| Tool: Faculty Finder | ? Done | Cabin, office hours, email lookup |
| Tool: Fee Deadlines | ? Done | Semester fees, late fee penalty, payment portal |
| Mock Database | ? Done | In-memory DB for books, faculty, fees, university info |
| RAG Service | ? Done | Azure AI Search (primary) + local keyword fallback |
| University Rulebook | ? Done | Ordinance docs: attendance, hostel, branch change, exams |
| Azure OpenAI Service | ? Done | GPT-4o-mini grounded response generation with fallback |
| Chat Router | ? Done | POST /api/chat — text query + language code |
| Voice Router | ? Done | POST /api/voice — audio file upload |
| Tools Router | ? Done | GET /api/tools — registered tool list |

### Frontend (React 19 + Vite)

| Component | Status | Description |
|---|---|---|
| App Shell | ? Done | Client-side routing via AppContext, Navbar + Footer |
| AssistantPage | ? Done | Voice/text chat UI connecting to backend |
| AboutPage | ? Done | Project overview with feature highlights |
| ArchitecturePage | ? Done | System architecture visual |
| KnowledgePage | ? Done | RAG knowledge base viewer |
| TechnologyPage | ? Done | Tech stack detail page |
| SecurityPage | ? Done | Security & privacy info |
| TeamPage | ? Done | Team members display |
| CitationDrawer | ? Done | Slide-out panel for RAG source citations |
| AppContext | ? Done | Global state for routing, language, voice mode |
| Design System | ? Done | CSS tokens, animations, glassmorphism in index.css |

### Testing & Utilities

| File | Status | Description |
|---|---|---|
| test_azure_services.py | ? Done | Tests Azure Speech, OpenAI, AI Search connectivity |
| test_openai_endpoint.py | ? Done | Standalone OpenAI endpoint smoke test |
| backend/test_suite.py | ? Done | Backend integration test suite |
| backend/tools/setup_azure_search.py | ? Done | Script to create Azure AI Search index |

---

## ?? What Still Needs to Be Done

### Priority 1 — Azure Credentials & Live Integration

- [ ] **Add real Azure credentials** to `backend/.env`:
  ```
  AZURE_OPENAI_API_KEY=<your-key>
  AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com/
  AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
  AZURE_SPEECH_KEY=<your-key>
  AZURE_SPEECH_REGION=centralindia
  AZURE_SEARCH_API_KEY=<your-key>
  AZURE_SEARCH_ENDPOINT=https://<your-resource>.search.windows.net
  AZURE_SEARCH_INDEX_NAME=university-docs
  ```
- [ ] Run `setup_azure_search.py` to create AI Search index and upload rulebook
- [ ] Run `test_azure_services.py` to verify all three Azure services are reachable

### Priority 2 — Agent Enhancements

- [ ] **Azure OpenAI Tool Calling** — Replace keyword-based tool routing in `agent_service.py` with GPT-4o function-calling (LLM selects tools, not if/elif chains)
- [ ] **Conversation Memory** — Session-based chat history so agent maintains context across turns (currently stateless)
- [ ] **Streaming Responses** — Server-Sent Events (SSE) for streaming LLM tokens to the frontend
- [ ] **New Tools to Add:**
  - [ ] `get_exam_timetable` — Exam schedule by department/semester
  - [ ] `check_attendance_status` — Per-student attendance percentage
  - [ ] `get_hostel_room_status` — Hostel room assignment / vacancy
  - [ ] `get_course_syllabus` — Course-wise syllabus retrieval
- [ ] **Real Database** — Replace `mock_db.py` with PostgreSQL / Azure Cosmos DB

### Priority 3 — Voice & Speech Improvements

- [ ] **Browser-side STT** — Use `microsoft-cognitiveservices-speech-sdk` (already in package.json) for low-latency browser STT
- [ ] **Voice Activity Detection (VAD)** — Auto-stop recording when user stops speaking
- [ ] **Streaming TTS** — Stream audio chunks instead of waiting for full base64 response
- [ ] **Multi-turn Voice Mode** — Continuous voice loop (listen ? respond ? listen)

### Priority 4 — Frontend Polish

- [ ] **Chat History Persistence** — Save conversation to `localStorage` so it survives page refresh
- [ ] **Language Auto-Detect** — Show detected language from Sarvam STT and auto-switch selector
- [ ] **Loading Skeletons** — Content-aware skeleton loaders instead of spinners
- [ ] **Mobile Responsiveness** — Audit and fix all pages for small screens
- [ ] **Accessibility (a11y)** — ARIA labels, keyboard navigation, focus management
- [ ] **React Error Boundaries** — Prevent a crashed component from breaking the whole app

### Priority 5 — Infrastructure & Deployment

- [ ] **Docker Compose** — `docker-compose.yml` to run backend + frontend together
- [ ] **Azure Container Apps / App Service** — Cloud deployment configuration
- [ ] **GitHub Actions CI/CD** — Automated lint + test + build pipeline
- [ ] **Startup Environment Validation** — Validate required env vars on start with clear errors
- [ ] **Rate Limiting** — Per-IP rate limiting on the voice endpoint
- [ ] **Proper .gitignore** — Ensure .env, __pycache__, node_modules, dist are excluded

---

## ?? Quick Start (Local Development)

### Prerequisites
- Python 3.10+
- Node.js 20+
- Sarvam AI API key ([sarvam.ai](https://sarvam.ai))
- Azure subscription (for OpenAI, Speech, and AI Search)

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
# Edit .env with your Azure + Sarvam keys
python run.py
# Backend: http://localhost:8000
# Swagger: http://localhost:8000/docs
```

### 2. Frontend Setup

```bash
npm install
npm run dev
# Frontend: http://localhost:5173
```

### 3. Test Azure Services

```bash
python test_azure_services.py
```

---

## ?? Supported Indian Languages

| Language | Code | STT | TTS |
|---|---|---|---|
| Hindi | hi-IN | ? | ? |
| English (India) | en-IN | ? | ? |
| Tamil | ta-IN | ? | ? |
| Telugu | te-IN | ? | ? |
| Marathi | mr-IN | ? | ? |
| Bengali | bn-IN | ? | ? |
| Gujarati | gu-IN | ? | ? |
| Kannada | kn-IN | ? | ? |
| Malayalam | ml-IN | ? | ? |
| Punjabi | pa-IN | ? | ? |
| Odia | or-IN | ? | ? |

---

## ?? API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Health check + model info |
| GET | /api/health | Detailed service health |
| POST | /api/chat | Text query to multilingual response + audio |
| POST | /api/voice | Audio upload ? STT ? agent ? TTS response |
| GET | /api/tools | List of registered university tools |
| GET | /docs | Swagger interactive API docs |

### POST /api/chat Example

```json
{
  "query": "Library mein Data Structures ki book available hai?",
  "language_code": "hi-IN",
  "user_role": "student",
  "generate_audio": true
}
```

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Lucide React, Vanilla CSS |
| Backend | FastAPI, Uvicorn, Pydantic v2, httpx |
| STT / TTS | Sarvam AI (saaras:v2 + bulbul:v2) |
| LLM | Azure OpenAI GPT-4o-mini |
| RAG | Azure AI Search + local keyword fallback |
| Speech SDK | Microsoft Cognitive Services Speech SDK (browser) |
| Config | pydantic-settings + .env |

---

## ?? Team

This project was built for the **Microsoft Azure AI Hackathon**.

---

*For questions, open an issue or contact the team.*
