import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import OpenInboxButton from "../../component/openEmailButton";
import toast from "react-hot-toast";

export default function EmailVerificationNoticePage() {
  const [cooldown, setCooldown] = useState(0); // remaining seconds
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const COOLDOWN = 60; // 60 seconds

  // Check localStorage on mount
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

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
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
    <>
      <h1 className="auth-title">We’ve sent you a verification email 📩</h1>
      <p className="auth-subtitle">
        Please confirm your email to activate your account.
      </p>
      <OpenInboxButton email={email} />
      <p className="auth-hint">
        If you don't see the email, check your spam or junk folder. It might be
        hiding there!
      </p>
      <p className="auth-hint">Didn’t get the email? No problem—it happens.</p>
      <button
        onClick={handleResend}
        className="auth-btn auth-btn-primary"
        disabled={cooldown > 0}
      >
        {cooldown > 0
          ? `Please wait ${cooldown}s...`
          : "Resend Verification Email"}
      </button>
    </>
  );
}
