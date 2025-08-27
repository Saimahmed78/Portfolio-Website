import { useState } from "react";
import "./styles/verifyEmailPage.css"; // import the css file
import { useNavigate } from "react-router";
import OpenInboxButton from "../../component/openEmailButton";

export default function VerifyEmailPage() {
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  console.log("Email from localStorage:", email);
  const handleResend = () => {
    console.log("Resend verification email API call");
    navigate("/resendVerifyEmail");
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-content">
          {/* Heading */}
          <h1 className="verify-title">
            We’ve sent you a verification email 📩
          </h1>
          <p className="verify-subtitle">
            Please confirm your email to activate your account.
          </p>
          <OpenInboxButton email={email} />
          <p className="verify-hint">
            If you don't see the email, check your spam or junk folder. It might
            be hiding there!
          </p>

          {/* Resend section */}
          <p className="verify-hint">
            Didn’t get the email? No problem—it happens.
          </p>
          <button onClick={handleResend} className="verify-btn verify-btn-primary">
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
}
