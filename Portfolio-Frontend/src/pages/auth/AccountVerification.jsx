import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import apiClient from "../../../service/apiClient";

function AccountVerification() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
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
        console.log("response", response);
        if (response?.success) {
          setVerified(true);
          setSuccessMessage(
            response.data || "Account Verified Successfully ✅",
          );
        } else {
          setErrorMessage(
            error.data || "There is something wrong from the server ❌",
          );
        }
      } catch (error) {
        console.log("Error in verification " , error)
        setErrorMessage(error.message || "Verification failed ❌");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to my Portfolio Website</h1>
        {loading ? (
          <>
            <div className="spinner" />
            <p>Your account is being verified. Sorry for inconvenience</p>
          </>
        ) : verified ? (
          <>
            <h2>🎉 Congratulations Your account is verified</h2>
            <p>{successMessage}</p>
            <button onClick={() => (window.location.href = "/login")}>
              Go to Login
            </button>
          </>
        ) : (
          <>
            <h2>❌ Account Verification failed</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => (window.location.href = "/resendVerifyEmail")}
            >
              Resend Verification Email
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default AccountVerification;
