import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Confetti from "react-confetti";
import apiClient from "../../../services/apiClient";

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

export default function AccountVerificationResultPage() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useParams();
  const effectRan = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (effectRan.current || !token) return;
    effectRan.current = true;

    const verify = async () => {
      setLoading(true);
      try {
        const response = await apiClient.verify(token);
        if (response?.success) {
          setVerified(true);
          setSuccessMessage(
            response.data || "Your account has been verified successfully 🎉"
          );
        } else {
          setErrorMessage(
            response?.data || "Something went wrong from the server ❌"
          );
        }
      } catch (error) {
        setErrorMessage(error.message || "Verification failed ❌");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="modal-overlay">
      {verified && <Confetti recycle={false} numberOfPieces={2400} gravity={0.15} />}

      <div className="modal text-center animate-fadeIn">
        <div className="modal-logo-wrap">
          <div className="modal-logo-icon"><LogoIcon size={26} /></div>
        </div>

        {loading ? (
          <>
            <div className="loader" style={{ margin: '2rem auto' }}></div>
            <h2 className="modal-title">Verifying account...</h2>
            <p className="modal-sub">Please wait while we confirm your details.</p>
          </>
        ) : verified ? (
          <>
            <h2 className="modal-title">Verification Success! ✅</h2>
            <p className="modal-sub" style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>
              {successMessage}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Your account is now fully active. You can now log in and start creating polls.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="btn-submit"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <h2 className="modal-title" style={{ color: 'var(--accent-danger)' }}>Verification Failed ❌</h2>
            <p className="modal-sub">
              {errorMessage}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              The verification link may have expired or is invalid. Try resending the verification email.
            </p>
            <button
              onClick={() => navigate("/resendVerifyEmail")}
              className="btn-submit"
            >
              Resend Verification Email
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="btn-ghost"
              style={{ marginTop: '1rem', width: '100%', border: 'none' }}
            >
              Back to Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
