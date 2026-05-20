import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { resendVerifySchema } from "../../schemas/authSchema";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import FormLoader from "../../components/FormLoader.jsx";

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

export default function ResendVerificationEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resendVerifySchema),
    defaultValues: { email: email },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.resendVerifyEmail(data.email);
      if (response?.success) {
        toast.success("Verification Email sent successfully ✅");
        reset();
        navigate("/verifyEmail");
        localStorage.setItem("lastResendTimestamp", Date.now().toString());
      } else {
        toast.error("Something went wrong from the server ❌");
      }
    } catch (error) {
      toast.error(
        error?.message || "Something went wrong in resend request ❌",
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal animate-fadeIn">
        <div className="modal-logo-wrap">
          <div className="modal-logo-icon"><LogoIcon size={26} /></div>
        </div>

        <h2 className="modal-title">Resend Verification</h2>
        <p className="modal-sub">
          Didn't receive the email? Enter your email address below and we'll send a new verification link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isSubmitting && <FormLoader message="Sending verification email…" />}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              {...register("email")}
              className={`form-input ${errors.email ? 'border-accent-danger' : ''}`}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-submit"
            style={{ marginTop: '1rem' }}
          >
            {isSubmitting ? "Sending..." : "Send Verification Email"}
          </button>
        </form>

        <button 
          onClick={() => navigate("/login")}
          className="btn-ghost"
          style={{ marginTop: '1.5rem', width: '100%', border: 'none' }}
        >
          Back to Sign in
        </button>
      </div>
    </div>
  );
}
