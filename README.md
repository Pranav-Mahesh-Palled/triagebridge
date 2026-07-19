```md
# TriageBridge

AI-powered emergency intake assistant for hospitals and clinics.

## Problem
Front-desk or intake staff often capture patient complaints in messy free text. During rush hours, critical warning signs can be missed before a clinician sees the patient.

## Solution
TriageBridge extracts symptoms, red flags, and vital-risk indicators from patient input, then assigns urgency and creates a structured summary for clinician handoff.

## Features
- Emergency-risk extraction from free text
- Urgency scoring with explanation
- Structured case summary
- Demo sample cases
- Optional LLM-enhanced extraction

## Tech Stack
- React + Vite
- FastAPI
- CSS with custom components
- Optional OpenAI API integration

## Run locally
### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment
Backend:
```env
OPENAI_API_KEY=
ALLOWED_ORIGIN=http://localhost:5173
USE_LLM=false
```

Frontend:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## Why AI matters here
This is not a chatbot wrapper. AI is used to convert unstructured symptom descriptions into structured triage signals that directly drive urgency scoring and escalation.

## Demo flow
1. Open app
2. Load a sample case
3. Click analyze
4. Show extracted red flags, urgency, and handoff summary
5. Explain impact: faster escalation for high-risk patients
```
