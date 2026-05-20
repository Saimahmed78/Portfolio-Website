/**
 * FormLoader — Premium full-overlay loading animation for auth forms.
 * Shows orbiting dots around a pulsing logo with a status message.
 * Renders as an absolute overlay so it covers the form content cleanly.
 */
export default function FormLoader({ message = "Please wait…" }) {
  return (
    <div className="form-loader-overlay">
      {/* Orbiting dots ring */}
      <div className="form-loader-ring">
        <div className="form-loader-dot" style={{ "--i": 0 }} />
        <div className="form-loader-dot" style={{ "--i": 1 }} />
        <div className="form-loader-dot" style={{ "--i": 2 }} />
        <div className="form-loader-dot" style={{ "--i": 3 }} />
        <div className="form-loader-dot" style={{ "--i": 4 }} />
        <div className="form-loader-dot" style={{ "--i": 5 }} />
        <div className="form-loader-dot" style={{ "--i": 6 }} />
        <div className="form-loader-dot" style={{ "--i": 7 }} />

        {/* Center logo pulse */}
        <div className="form-loader-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="4" rx="2" fill="white" fillOpacity="0.9" />
            <rect x="3" y="10" width="8" height="4" rx="2" fill="white" fillOpacity="0.6" />
            <rect x="3" y="17" width="8" height="4" rx="2" fill="white" fillOpacity="0.35" />
            <rect x="14" y="3" width="7" height="18" rx="2" fill="white" fillOpacity="0.2" />
            <rect x="14" y="3" width="7" height="7" rx="2" fill="white" fillOpacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Status message */}
      <p className="form-loader-text">{message}</p>
    </div>
  );
}
