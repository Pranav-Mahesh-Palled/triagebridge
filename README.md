# TriageBridge

AI-powered emergency intake support for busy clinics.

## Live Links

- **Frontend:** https://triagebridge-cc4ifljsl-nxt-wave-academy.vercel.app/
- **Backend:** https://triagebridge-backend.onrender.com
- **Demo Video:** https://drive.google.com/file/d/1S45qbIL9y248yIFBoW6WntY1SQH5lkYw/view?usp=drive_link

---

## Overview

TriageBridge helps clinic staff turn unstructured patient complaints into a clear urgency result, red-flag summary, and clinician-ready handoff note. It is designed for one focused use case: helping overloaded clinics process first-level intake faster and more consistently.

---

## Problem

In many clinics, the first patient complaint is captured as free text at the front desk or during initial intake. Important warning signs can be missed because symptoms, vitals, and risk clues are buried in a messy description. This slows down escalation, creates inconsistent handoff, and makes emergency intake harder during busy hours.

---

## Solution

TriageBridge analyzes patient intake details and complaint text to produce:

- urgency level
- risk score
- red flags
- vitals alerts
- suggested pathway
- clinician-ready handoff summary

The goal is to support staff during first-level screening and make escalation faster, clearer, and more consistent.

---

## Theme

**Crisis Management, HealthTech & Emergency Response**

---

## Target Users

- Clinic reception staff
- Front-desk intake staff
- Triage support staff
- Small hospital intake teams

---

## Key Features

- Complaint-based patient intake
- AI-assisted triage signal extraction
- Urgency scoring
- Red-flag detection
- Vitals-aware alerts
- Suggested care pathway
- Handoff summary generation
- Sample cases for quick demo
- Live deployed full-stack setup

---

## AI Role

The AI is central to the product workflow. Instead of acting like a basic chatbot, it helps convert raw patient complaint text into structured triage signals that can be used to identify risk, classify urgency, and generate a readable clinical summary.

---

## How It Works

1. A staff member enters patient details, complaint text, and basic intake information.
2. The frontend sends the case to the backend API.
3. The backend analyzes the input and extracts triage signals.
4. The system returns urgency, alerts, red flags, and a short handoff note.
5. The frontend presents the result in a clean and readable format.

---

## Example Use Cases

- Chest pain with low oxygen
- Possible stroke presentation
- Fever with stable vitals

These cases are included in the app so the product can be demonstrated quickly and reliably.

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
ALLOWED_ORIGIN = https://triagebridge-cc4ifljsl-nxt-wave-academy.vercel.app
```

## Future Improvements

- multilingual intake support
- voice-to-triage input
- offline-first mode for low-connectivity areas
- confidence scoring
- hospital dashboard for queue prioritization

---
