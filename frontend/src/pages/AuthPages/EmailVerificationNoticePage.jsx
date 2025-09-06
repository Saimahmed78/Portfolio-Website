import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import OpenInboxButton from "../../components/OpenInboxButton/OpenInboxButton";
import toast from "react-hot-toast";
import styles from "../../layouts/Auth/AuthShared.module.css"; // shared layout + card styles

export default function EmailVerificationNoticePage() {
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const COOLDOWN = 60;

  // Check last resend timestamp
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
    <div className={styles["auth-container"]}>
      <div className={styles["auth-card"]}>
        <h1 className={styles["auth-title"]}>
          We’ve sent you a verification email 📩
        </h1>
        <p className={styles["auth-subtitle"]}>
          Please confirm your email to activate your account.
        </p>

        <OpenInboxButton email={email} />

        <p className={styles["auth-hint"]}>
          If you don't see the email, check your spam or junk folder. It might
          be hiding there!
        </p>
        <p className={styles["auth-hint"]}>
          Didn’t get the email? No problem—it happens.
        </p>

        <button
          onClick={handleResend}
          className={`${styles["auth-btn"]} ${styles["auth-btn-primary"]}`}
          disabled={cooldown > 0}
        >
          {cooldown > 0
            ? `Please wait ${cooldown}s...`
            : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
