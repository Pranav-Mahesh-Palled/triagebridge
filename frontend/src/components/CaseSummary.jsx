export default function CaseSummary({ analysis, patient }) {
  return (
    <section className="panel">
      <p className="eyebrow">Step 3</p>
      <h2>Clinician handoff</h2>

      {analysis ? (
        <>
          <div className="summary-grid">
            <div className="mini-card">
              <span>Patient</span>
              <strong>{patient.patient_name}</strong>
            </div>
            <div className="mini-card">
              <span>Age / Sex</span>
              <strong>{patient.age} / {patient.sex}</strong>
            </div>
            <div className="mini-card">
              <span>History hits</span>
              <strong>{analysis.history_hits.length ? analysis.history_hits.join(', ') : 'None'}</strong>
            </div>
            <div className="mini-card">
              <span>Signal tags</span>
              <strong>{analysis.symptom_tags.length ? analysis.symptom_tags.join(', ') : 'General symptoms'}</strong>
            </div>
          </div>
          <div className="handoff-box">
            <p>{analysis.handoff_summary}</p>
          </div>
        </>
      ) : (
        <p>This panel will generate a concise handoff summary after analysis.</p>
      )}
    </section>
  )
}
