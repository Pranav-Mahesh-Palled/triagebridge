from typing import Dict, List

RED_FLAG_LIBRARY = {
    "chest pain": {"weight": 35, "label": "Cardiac risk symptom", "bucket": "cardiac"},
    "left arm pain": {"weight": 20, "label": "Radiating pain", "bucket": "cardiac"},
    "breathlessness": {"weight": 24, "label": "Respiratory distress", "bucket": "respiratory"},
    "shortness of breath": {"weight": 24, "label": "Respiratory distress", "bucket": "respiratory"},
    "slurred speech": {"weight": 42, "label": "Possible stroke sign", "bucket": "neuro"},
    "facial droop": {"weight": 42, "label": "Possible stroke sign", "bucket": "neuro"},
    "arm weakness": {"weight": 35, "label": "Possible stroke weakness", "bucket": "neuro"},
    "confusion": {"weight": 24, "label": "Altered mental status", "bucket": "neuro"},
    "seizure": {"weight": 36, "label": "Seizure presentation", "bucket": "neuro"},
    "high fever": {"weight": 10, "label": "High fever", "bucket": "infectious"},
    "bleeding": {"weight": 26, "label": "Active bleeding risk", "bucket": "trauma"},
    "unconscious": {"weight": 50, "label": "Loss of consciousness", "bucket": "critical"},
    "vomiting": {"weight": 8, "label": "Persistent vomiting", "bucket": "general"},
    "pregnant": {"weight": 10, "label": "Pregnancy risk context", "bucket": "obgyn"},
    "sweating": {"weight": 6, "label": "Autonomic distress clue", "bucket": "general"},
    "dizziness": {"weight": 8, "label": "Neurological/hemodynamic clue", "bucket": "general"},
}

HISTORY_WEIGHTS = {
    "diabetes": 8,
    "hypertension": 6,
    "smoker": 6,
    "asthma": 6,
    "heart disease": 12,
    "pregnancy": 8,
}


def _normalize_text(value: str) -> str:
    return (value or "").strip().lower()


def extract_signals(payload: Dict) -> Dict:
    symptom_text = _normalize_text(payload.get("symptoms", ""))
    history_text = _normalize_text(payload.get("medical_history", ""))

    found_flags: List[Dict] = []
    symptom_tags: List[str] = []
    buckets = set()
    score = 0

    phrase_aliases = {
        "pain moving to left arm": "left arm pain",
        "left arm weakness": "arm weakness",
        "weakness in arm": "arm weakness",
        "cannot breathe": "shortness of breath",
        "difficulty breathing": "breathlessness",
        "passed out": "unconscious",
    }

    for raw, canonical in phrase_aliases.items():
        if raw in symptom_text and canonical not in symptom_text:
            symptom_text += f" {canonical}"

    for key, meta in RED_FLAG_LIBRARY.items():
        if key in symptom_text:
            found_flags.append({"signal": key, "label": meta["label"], "weight": meta["weight"]})
            symptom_tags.append(key)
            buckets.add(meta["bucket"])
            score += meta["weight"]

    temperature = payload.get("temperature")
    hr = payload.get("heart_rate")
    spo2 = payload.get("spo2")
    sbp = payload.get("systolic_bp")

    vitals = []
    if temperature and temperature >= 102:
        vitals.append("High temperature")
        score += 10
    if hr and hr >= 120:
        vitals.append("Tachycardia")
        score += 14
    elif hr and hr >= 100:
        vitals.append("Mild tachycardia")
        score += 8
    if spo2 and spo2 <= 92:
        vitals.append("Low oxygen saturation")
        score += 32
        buckets.add("respiratory")
    elif spo2 and spo2 <= 95:
        vitals.append("Borderline oxygen saturation")
        score += 12
    if sbp and sbp < 90:
        vitals.append("Severe low blood pressure")
        score += 32
        buckets.add("critical")
    elif sbp and sbp < 100:
        vitals.append("Low blood pressure")
        score += 18

    history_hits = []
    for key, weight in HISTORY_WEIGHTS.items():
        if key in history_text:
            history_hits.append(key)
            score += weight

    urgency = "Low"
    action = "Stable for standard clinical queue. Monitor and reassess if symptoms progress."
    if score >= 80:
        urgency = "Critical"
        action = "Immediate escalation. Move patient to emergency clinician review now."
    elif score >= 50:
        urgency = "High"
        action = "Priority review required. Fast-track to clinician and continue close monitoring."
    elif score >= 25:
        urgency = "Moderate"
        action = "Early clinical review recommended. Keep under observation and repeat vitals."

    explanation = []
    if found_flags:
        explanation.append("Red-flag symptoms detected from natural-language intake.")
    if vitals:
        explanation.append("Abnormal vitals increased urgency score.")
    if history_hits:
        explanation.append("Existing risk factors raised escalation priority.")
    if not explanation:
        explanation.append("No major emergency indicators detected from current intake.")

    likely_pathway = "General medicine"
    if "cardiac" in buckets:
        likely_pathway = "Cardiac emergency evaluation"
    elif "neuro" in buckets:
        likely_pathway = "Stroke / neurological evaluation"
    elif "respiratory" in buckets:
        likely_pathway = "Respiratory emergency evaluation"
    elif "infectious" in buckets:
        likely_pathway = "Acute infection review"

    handoff = (
        f"{payload.get('patient_name', 'Patient')}, {payload.get('age', 'NA')} years, presents with {payload.get('symptoms', '').strip()} "
        f"Duration: {payload.get('duration', 'not specified')}. "
        f"Vitals: temp {payload.get('temperature', 'NA')} F, HR {payload.get('heart_rate', 'NA')}, SpO2 {payload.get('spo2', 'NA')}%, "
        f"BP {payload.get('systolic_bp', 'NA')}/{payload.get('diastolic_bp', 'NA')}. "
        f"Urgency assessed as {urgency}. Suggested pathway: {likely_pathway}."
    )

    return {
        "urgency": urgency,
        "score": score,
        "likely_pathway": likely_pathway,
        "red_flags": found_flags,
        "vitals_flags": vitals,
        "history_hits": history_hits,
        "symptom_tags": symptom_tags,
        "explanation": explanation,
        "recommended_action": action,
        "handoff_summary": handoff,
    }
