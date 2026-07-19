function urgencyTone(level) {
  if (level === 'Critical') return 'critical'
  if (level === 'High') return 'high'
  if (level === 'Moderate') return 'moderate'
  return 'low'
}

export default function RiskResults({ analysis }) {
  if (!analysis) {
    return (
      <section className="panel result-empty">
        <p className="eyebrow">Step 2</p>
        <h2>Urgency result</h2>
        <p>Run an analysis to view extracted red flags, urgency score, and recommended action.</p>
      </section>
    )
  }

  const tone = urgencyTone(analysis.urgency)

  return (
    <section className="panel">
      <div className="result-top">
        <div>
          <p className="eyebrow">Step 2</p>
          <h2>Urgency result</h2>
        </div>
        <div className={`urgency-badge ${tone}`}>{analysis.urgency}</div>
      </div>

      <div className="score-card">
        <div>
          <span className="metric-label">Risk score</span>
          <strong>{analysis.score}</strong>
        </div>
        <div>
          <span className="metric-label">Suggested pathway</span>
          <strong>{analysis.likely_pathway}</strong>
        </div>
      </div>

      <div className="result-columns">
        <div>
          <h3>Red flags</h3>
          <ul>
            {analysis.red_flags.length ? analysis.red_flags.map(flag => (
              <li key={flag.signal}>{flag.label} — <span>{flag.signal}</span></li>
            )) : <li>No major red-flag symptom detected.</li>}
          </ul>
        </div>
        <div>
          <h3>Vitals alerts</h3>
          <ul>
            {analysis.vitals_flags.length ? analysis.vitals_flags.map(item => <li key={item}>{item}</li>) : <li>Vitals currently stable.</li>}
          </ul>
        </div>
      </div>

      <div className="notes-block">
        <h3>Why the model flagged this case</h3>
        <ul>
          {analysis.explanation.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="action-box">
        <h3>Recommended next action</h3>
        <p>{analysis.recommended_action}</p>
      </div>
    </section>
  )
}
