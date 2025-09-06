import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Confetti from "react-confetti";
import apiClient from "../../../services/apiClient";

import styles from "../../layouts/Auth/AuthShared.module.css"; // shared layout + card styles

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
            response.data || "Your account has been verified successfully 🎉",
          );
        } else {
          setErrorMessage(
            response?.data || "Something went wrong from the server ❌",
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
    <>
      {verified && <Confetti recycle={false} numberOfPieces={2400} />}

      {loading ? (
        <>
          <div className={styles["auth-spinner"]} />
          <h2 className={styles["auth-title"]}>Verifying your account...</h2>
          <p className={styles["auth-hint"]}>
            Please wait while we confirm your details.
          </p>
        </>
      ) : verified ? (
        <>
          <h2 className={styles["auth-title"]}>✅ Account Verified!</h2>
          <p className={styles.success}>{successMessage}</p>
          <button
            className={`${styles["auth-btn"]} ${styles["auth-btn-primary"]}`}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </>
      ) : (
        <>
          <h2 className={styles["auth-title"]}>❌ Verification Failed 😭</h2>
          <p className={styles.fail}>{errorMessage}</p>
          <button
            className={`${styles["auth-btn"]} ${styles["auth-btn-primary"]}`}
            onClick={() => navigate("/resendVerifyEmail")}
          >
            Resend Verification Email
          </button>
        </>
      )}
    </>
  );
}

