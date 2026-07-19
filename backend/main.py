import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from triage_engine import extract_signals
from sample_cases import SAMPLE_CASES

load_dotenv()

app = FastAPI(title="TriageBridge API")

allowed_origin = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IntakePayload(BaseModel):
    patient_name: str
    age: int
    sex: str
    symptoms: str
    duration: str
    temperature: float
    heart_rate: int
    spo2: int
    systolic_bp: int
    diastolic_bp: int
    medical_history: str

@app.get('/health')
def health():
    return {"status": "ok", "service": "triagebridge-api"}

@app.get('/cases')
def get_cases():
    return SAMPLE_CASES

@app.post('/analyze')
def analyze(payload: IntakePayload):
    result = extract_signals(payload.model_dump())
    return {
        "patient": payload.model_dump(),
        "analysis": result
    }
