# TriageBridge

AI-powered emergency intake support for overloaded clinics.

## Live Links

- **Frontend:** https://triagebridge-pi1z814nl-nxt-wave-academy.vercel.app/
- **Backend:** https://triagebridge-backend.onrender.com/
- **Demo Video:** https://YOUR-DEMO-VIDEO-LINK

---

## Problem Statement

In busy clinics and emergency desks, the first patient description is often captured as unstructured text by non-clinical or semi-clinical staff. Important warning signs such as chest pain, low oxygen, slurred speech, altered consciousness, or severe bleeding can be missed or delayed because they are buried inside free-text intake notes.

This creates three major issues:
- delayed escalation for high-risk cases
- inconsistent handoff to clinicians
- slower decision-making during patient overload

TriageBridge solves this by converting raw intake information into urgency level, red flags, vitals alerts, and a clinician-ready summary.

---

## Theme

**Crisis Management, HealthTech & Emergency Response**

---

## Target User

- Reception staff in clinics
- Front-desk health workers
- Triage support staff
- Small hospital intake teams

---

## Solution Overview

TriageBridge is a focused emergency intake web app that helps staff process a patient complaint quickly. The user enters symptoms, duration, vitals, and short notes. The system analyzes the input and produces:

- urgency result
- risk score
- red flags
- vitals alerts
- suggested pathway
- clinician handoff summary

The goal is not to replace doctors. The goal is to help clinics identify risk faster and make handoff clearer.

---

## Why this solution matters

Most healthcare demo ideas become too broad. TriageBridge is intentionally narrow and solves one real workflow extremely well: emergency intake support. This makes it easier to understand, easier to demo, and more useful for a hackathon judging round where clarity and execution matter.

---

## Core Features

- Natural-language patient complaint input
- AI-assisted triage signal extraction
- Risk score generation
- Urgency classification
- Red-flag detection
- Vitals-based alerting
- Suggested clinical pathway
- Clinician-ready handoff note
- Sample cases for quick demo
- Frontend fallback mode for resilient demo experience

---

## AI Component

The AI is part of the core product logic, not just a chatbot wrapper.

TriageBridge uses AI-assisted analysis to transform unstructured patient intake text into structured triage signals. These signals are then used to identify red flags, classify urgency, and generate a short handoff summary.

### AI responsibilities

- extract symptom clues from free text
- identify high-risk patterns
- structure the complaint into actionable triage information
- support urgency scoring and explanation

This makes the AI central to the product’s value.

---

## How It Works

1. A staff member enters a patient complaint and intake details.
2. The frontend sends the case to the backend API.
3. The backend analyzes the complaint and extracts triage signals.
4. The backend returns urgency, risk indicators, and summary output.
5. The frontend displays the result in a simple judge-friendly interface.

---

## Example Use Cases

- Chest pain with low oxygen
- Possible stroke presentation
- Moderate fever with stable vitals

These sample cases are included to make the demo quick and reliable.

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- FastAPI
- Python

### Deployment
- Vercel for frontend
- Render for backend

### Version Control
- GitHub

---

## Project Structure

```text
triagebridge/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── triage logic files
└── README.md
```

---

## Architecture

### Frontend
The frontend provides the intake form, sample-case flow, result cards, and connection status UI.

### Backend
The backend exposes API endpoints for:
- health check
- sample cases
- triage analysis

### Data Flow
- user input → frontend
- frontend request → backend API
- backend triage analysis → structured result
- result → frontend display

---

## API Endpoints

### Health
```http
GET /health
```

### Sample Cases
```http
GET /cases
```

### Analyze Case
```http
POST /analyze
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Pranav-Mahesh-Palled/triagebridge
cd triagebridge
```

### 2. Run backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:
```text
http://127.0.0.1:8000
```

### 3. Run frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```text
http://127.0.0.1:5173
```

---

## Environment Variables

### Frontend

Create or configure:

```bash
VITE_API_BASE_URL = https://triagebridge-backend.onrender.com
```

### Backend

Configure:

```bash
ALLOWED_ORIGIN = https://triagebridge-pi1z814nl-nxt-wave-academy.vercel.app/
```

## Future Improvements

- multilingual intake support
- voice-to-triage input
- offline-first mode for low-connectivity areas
- confidence scoring
- hospital dashboard for queue prioritization

---
