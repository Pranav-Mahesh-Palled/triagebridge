export default function Header() {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="img" aria-label="TriageBridge logo">
            <rect x="6" y="8" width="36" height="32" rx="12" fill="currentColor" opacity="0.12" />
            <path d="M16 24h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M24 16v16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M14 12c3-3 7-4 10-4s7 1 10 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="eyebrow">Emergency intake AI</p>
          <h1>TriageBridge</h1>
        </div>
      </div>
      <div className="header-copy">
        <p>Turn messy patient complaints into urgency, red flags, and clinician-ready handoff notes.</p>
      </div>
    </header>
  )
}
