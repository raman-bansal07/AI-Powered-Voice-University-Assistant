<div align="center">

<img src="https://img.icons8.com/color/96/000000/azure-1.png" alt="Azure Logo" width="80"/>
<h1 style="margin-bottom: 0;">UnivAI: Multilingual Voice Assistant</h1>
**AI-Powered University Knowledge & Academic Assistant**

[![Capstone Project](https://img.shields.io/badge/Capstone_Project-2025--2026-blue.svg?style=for-the-badge)](#)
[![Powered by Azure](https://img.shields.io/badge/Powered_by-Azure_AI-0078D4.svg?style=for-the-badge&logo=microsoft-azure&logoColor=white)](#)
[![Powered by Sarvam](https://img.shields.io/badge/Speech-Sarvam_AI-FF6B6B.svg?style=for-the-badge)](#)

</div>

---

## The Problem

Universities generate massive amounts of critical information—academic ordinances, fee schedules, hostel rules, and exam notices. Currently, navigating this data presents three major challenges:
1. **Information Silos:** Students waste hours manually searching through hundreds of scattered, text-heavy PDF circulars.
2. **Language Barriers:** Official university documents are strictly in complex English, making it difficult for students from diverse regional backgrounds to comprehend critical academic rules.
3. **Accessibility:** Traditional search bars require exact keyword matches and typing, which is not inclusive for visually impaired students or those who prefer natural voice interactions.

---

## What Our Project Does (The Solution)

**UnivAI** is an enterprise-grade, voice-first AI assistant designed specifically for university ecosystems. It completely transforms how students and faculty interact with university data.

- **Native Multilingual Voice Interaction:** Students can speak to the assistant in **10+ Indian languages** (Hindi, Tamil, Telugu, Marathi, etc.). The system transcribes, translates, and responds via neural voice in the user's native language.
- **Grounded Responses (Zero Hallucinations):** Powered by an advanced Retrieval-Augmented Generation (RAG) pipeline, the assistant *only* answers based on official university circulars. Every answer includes exact document citations.
- **Role-Based Access Control (RBAC):** Integrates with institutional identity providers to ensure a `student` cannot access `faculty` documents, and a `guest` cannot access private internal grades.
- **Out-of-Scope Guardrails:** Intelligent intent routing automatically blocks non-academic queries (e.g., weather, sports) to save compute resources and keep the assistant focused.

---

## Technology Stack

UnivAI is built on a modern, high-performance architecture separating the frontend UI from the Python AI backend.

### **Frontend & UI**
- **Framework:** React.js (Vite)
- **Styling:** Custom CSS Design System (Glassmorphism, Dark Theme)
- **Routing:** React Router

### **Backend & Orchestration**
- **Framework:** FastAPI (Python)
- **Concurrency:** Asyncio HTTPX for low-latency parallel processing
- **Vector Embeddings:** text-embedding-3-small

### **AI & Cloud Infrastructure**
- **Reasoning Engine:** Azure OpenAI (GPT-4.1-mini)
- **Knowledge Base (RAG):** Azure AI Search (Hybrid Vector + Semantic Re-ranking)
- **Security:** Microsoft Entra ID (RBAC)
- **Storage:** Azure Blob Storage (for PDF circulars)

---

## Powered By

This project leverages state-of-the-art cognitive services to achieve sub-second voice latency:

### **Sarvam AI**
*   **Speech-to-Text (STT):** Powered by Sarvam's `saaras:v3` model for highly accurate Indian dialect recognition, even in noisy environments.
*   **Text-to-Speech (TTS):** Powered by Sarvam's `bulbul:v3` model to generate natural, human-like neural voice responses in regional languages.

### **Microsoft Azure**
*   **Azure Cognitive Services:** Serves as the backbone for semantic search, intelligent intent routing, and fallback speech synthesis (`hi-IN-SwaraNeural`).

---

<div align="center">
<b>Department of Computer Science & Engineering</b><br>
Chitkara University | Capstone Project 2025–2026<br><br>

*Engineered by: Raman Deep Bansal, Satyam Chhabra, Sukritti Singla, Simran*
</div>
