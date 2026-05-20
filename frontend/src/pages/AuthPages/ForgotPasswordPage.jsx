import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import apiClient from "../../../services/apiClient";
import { forgotPassSchema } from "../../schemas/authSchema";
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

export default function ForgotPassword() {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPassSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.forgotPass(data.email);
      if (response) {
        toast.success(response.data || "Forgot Password Email sent successfully ✅");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        reset();
      } else {
        toast.error("There is something wrong from the server ❌");
      }
    } catch (error) {
      toast.error(error?.message || "Forgot password request failed ❌");
      console.error("Error in forgot password", error);
    }
  };

  return (
    <div className="modal-overlay">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} gravity={0.15} />}
      
      <div className="modal animate-fadeIn">
        <div className="modal-logo-wrap">
          <div className="modal-logo-icon"><LogoIcon size={26} /></div>
        </div>

        <h2 className="modal-title">Reset Password</h2>
        <p className="modal-sub">Enter your email and we'll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isSubmitting && <FormLoader message="Sending reset link…" />}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
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
            {isSubmitting ? "Sending..." : "Send Reset Link"}
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
