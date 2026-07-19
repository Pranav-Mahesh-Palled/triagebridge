import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import IntakeForm from './components/IntakeForm'
import RiskResults from './components/RiskResults'
import CaseSummary from './components/CaseSummary'
import { fallbackCases } from './data/sampleCases'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const blankForm = {
  patient_name: 'Anita',
  age: 45,
  sex: 'Female',
  symptoms: 'Severe breathing difficulty and chest tightness since this morning.',
  duration: '3 hours',
  temperature: 99.1,
  heart_rate: 108,
  spo2: 93,
  systolic_bp: 102,
  diastolic_bp: 68,
  medical_history: 'Asthma'
}

export default function App() {
  const [form, setForm] = useState(blankForm)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [samples, setSamples] = useState(fallbackCases)
  const [backendState, setBackendState] = useState('Checking backend...')

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(() => setBackendState('Backend connected'))
      .catch(() => setBackendState('Using local sample mode'))

    fetch(`${API_BASE}/cases`)
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length && setSamples(data))
      .catch(() => {})
  }, [])

  const onChange = (event) => {
    const { name, value, type } = event.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const onLoadSample = (payload) => {
    setForm(payload)
    setAnalysis(null)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!response.ok) throw new Error('Analysis failed')
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      setAnalysis({
        urgency: 'Moderate',
        score: 30,
        likely_pathway: 'General review',
        red_flags: [],
        vitals_flags: [],
        history_hits: [],
        symptom_tags: [],
        explanation: ['Backend unavailable. Start API to enable live AI-supported analysis.'],
        recommended_action: 'Run backend service for full triage pipeline.',
        handoff_summary: 'Backend not connected.'
      })
    } finally {
      setLoading(false)
    }
  }

  const statusTone = useMemo(() => backendState.includes('connected') ? 'good' : 'warn', [backendState])

  return (
    <div className="app-shell">
      <Header />

      <section className="hero-strip">
        <div>
          <p className="eyebrow">Hackathon-ready use case</p>
          <h2>Emergency intake support for overloaded clinics</h2>
          <p>One narrow problem, one clear user, one visible AI workflow. Judges can understand the product in under two minutes.</p>
        </div>
        <div className={`status-pill ${statusTone}`}>{backendState}</div>
      </section>

      <main className="dashboard-grid">
        <IntakeForm
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          loading={loading}
          samples={samples}
          onLoadSample={onLoadSample}
        />
        <RiskResults analysis={analysis} />
        <CaseSummary analysis={analysis} patient={form} />
      </main>
    </div>
  )
}
