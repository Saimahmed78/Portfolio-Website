import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import OpenInboxButton from "../../components/OpenInboxButton.jsx";
import toast from "react-hot-toast";

// ─── SVG Logo Icon ────────────────────────────────────────────────────────────
const LogoIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="4" rx="2" fill="white" fillOpacity="0.9" />
    <rect x="3" y="10" width="8" height="4" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="3" y="17" width="8" height="4" rx="2" fill="white" fillOpacity="0.35" />
    <rect x="14" y="3" width="7" height="18" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="14" y="3" width="7" height="7" rx="2" fill="white" fillOpacity="0.7" />
  </svg>
);

export default function EmailVerificationNoticePage() {
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const COOLDOWN = 60;

  useEffect(() => {
    const lastClick = localStorage.getItem("lastResendTimestamp");
    if (lastClick) {
      const now = Date.now();
      const elapsed = Math.floor((now - parseInt(lastClick, 10)) / 1000);
      if (elapsed < COOLDOWN) {
        setCooldown(COOLDOWN - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) {
      toast.error(`You requested recently! Please wait ${cooldown}s ⏳`);
      return;
    }
    navigate("/resendVerifyEmail");
  };

  return (
    <div className="modal-overlay">
      <div className="modal text-center animate-fadeIn">
        <div className="modal-logo-wrap">
          <div className="modal-logo-icon"><LogoIcon size={26} /></div>
        </div>

        <h2 className="modal-title">Check your inbox 📩</h2>
        <p className="modal-sub">
          We’ve sent a verification link to your email. Please confirm it to activate your account.
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <OpenInboxButton email={email} />
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Don't see it? Check your spam folder. It might take a minute or two to arrive.
        </p>

        <button
          onClick={handleResend}
          disabled={cooldown > 0}
          className="btn-submit"
          style={{ background: cooldown > 0 ? 'var(--bg-base)' : 'var(--accent-primary)', color: cooldown > 0 ? 'var(--text-muted)' : '#fff' }}
        >
          {cooldown > 0
            ? `Resend available in ${cooldown}s`
            : "Resend Verification Email"}
        </button>

        <button 
          onClick={() => navigate("/login")}
          className="btn-ghost"
          style={{ marginTop: '1rem', width: '100%', border: 'none' }}
        >
          Back to Sign in
        </button>
      </div>
    </div>
  );
}
