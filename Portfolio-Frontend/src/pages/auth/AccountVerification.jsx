import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Confetti from "react-confetti";
import apiClient from "../../../service/apiClient";
import "./styles/accountVerification.css";

function AccountVerification() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useParams();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current || !token) return;
    effectRan.current = true;

    const verify = async () => {
      setLoading(true);
      try {
        console.log("User is verifying account...");
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
        console.error("Error in verification:", error);
        setErrorMessage(error.message || "Verification failed ❌");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="verify-container">
      {verified && <Confetti recycle={false} numberOfPieces={400} />}
      <div
        className={`verify-box ${verified ? "success" : errorMessage ? "fail" : ""}`}
      >
        {loading ? (
          <>
            <div className="spinner" />
            <h2>Verifying your account...</h2>
            <p>Please wait while we confirm your details.</p>
          </>
        ) : verified ? (
          <>
            <h2 className="verify-title">✅ Account Verified!</h2>
            <p>{successMessage}</p>
            <button
              className="verify-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <h2 className="verify-title">❌ Verification Failed</h2>
            <p>{errorMessage}</p>
            <button
              className="verify-btn"
              onClick={() => (window.location.href = "/resendVerifyEmail")}
            >
              Resend Verification Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountVerification;
