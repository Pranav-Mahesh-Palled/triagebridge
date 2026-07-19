const fields = [
  ['patient_name', 'Patient name', 'text'],
  ['age', 'Age', 'number'],
  ['sex', 'Sex', 'text'],
  ['duration', 'Symptom duration', 'text'],
  ['temperature', 'Temperature (F)', 'number'],
  ['heart_rate', 'Heart rate', 'number'],
  ['spo2', 'SpO2', 'number'],
  ['systolic_bp', 'Systolic BP', 'number'],
  ['diastolic_bp', 'Diastolic BP', 'number'],
]

export default function IntakeForm({ form, onChange, onSubmit, loading, samples, onLoadSample }) {
  return (
    <section className="panel panel-form">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Step 1</p>
          <h2>Patient intake</h2>
        </div>
        <div className="sample-row">
          {samples.map(sample => (
            <button key={sample.id} className="sample-chip" onClick={() => onLoadSample(sample.payload)} type="button">
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="intake-grid">
        {fields.map(([key, label, type]) => (
          <label key={key} className="field">
            <span>{label}</span>
            <input
              name={key}
              type={type}
              value={form[key]}
              onChange={onChange}
              required
            />
          </label>
        ))}

        <label className="field field-wide">
          <span>Symptoms</span>
          <textarea
            name="symptoms"
            rows="4"
            value={form.symptoms}
            onChange={onChange}
            placeholder="Describe symptoms in natural language..."
            required
          />
        </label>

        <label className="field field-wide">
          <span>Medical history</span>
          <textarea
            name="medical_history"
            rows="3"
            value={form.medical_history}
            onChange={onChange}
            placeholder="Diabetes, hypertension, smoker, asthma..."
            required
          />
        </label>

        <div className="form-actions field-wide">
          <button className="primary-btn" disabled={loading} type="submit">
            {loading ? 'Analyzing...' : 'Analyze urgency'}
          </button>
          <p className="helper-text">AI extracts risk signals first, then urgency logic decides next action.</p>
        </div>
      </form>
    </section>
  )
}
