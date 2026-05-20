import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../services/apiClient";
import { registerSchema } from "../../schemas/authSchema";
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

// ─── Google SVG ───────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function RegisterUser() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.register(
        data.name,
        data.email,
        data.password,
      );
      console.log("response", response);
      toast.success(response?.data?.message || "Account Created ✅");
      reset();
      navigate("/verifyEmail");
      localStorage.setItem("lastResendTimestamp", Date.now().toString());
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");

    }
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="modal"
      >
        {/* Full-overlay loading animation */}
        {isSubmitting && <FormLoader message="Creating your account…" />}

        <div className="modal-logo-wrap">
          <Link to="/" className="modal-logo-icon"><LogoIcon size={26} /></Link>
        </div>

        <h2 className="modal-title">Create an account</h2>
        <p className="modal-sub">Start collecting feedback today</p>

        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            placeholder="Jane Doe"
            {...register("name")}
            className="form-input"
          />
          {errors.name && (
            <div className="form-error">{errors.name.message}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            {...register("email")}
            className="form-input"
          />
          {errors.email && (
            <div className="form-error">{errors.email.message}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Create a password"
              {...register("password")}
              className="form-input"
              style={{ paddingRight: "2.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-100"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <div className="form-error">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-submit"
        >
          Create my account
        </button>

        <div className="divider">or</div>

        {/* <button type="button" className="google-btn">
          <GoogleIcon />
          Continue with Google
        </button> */}

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Already have an account? <Link to="/login" style={{ background: "none", border: "none", color: "var(--accent-primary)", cursor: "pointer", fontSize: "inherit", padding: 0, textDecoration: "none" }}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}
