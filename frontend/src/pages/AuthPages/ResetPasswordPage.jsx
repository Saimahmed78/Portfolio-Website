import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { resetPassSchema } from "../../schemas/authSchema";
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

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resetPassSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.resetPass(token, data.newPass, data.confirmPass);
      if (response.statuscode >= 200 && response.statuscode < 300) {
        toast.success("Password reset successfully ✅");
        reset();
        navigate("/login");
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      toast.error(error.message || "Password reset failed ❌");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal animate-fadeIn">
        <div className="modal-logo-wrap">
          <div className="modal-logo-icon"><LogoIcon size={26} /></div>
        </div>

        <h2 className="modal-title">New Password</h2>
        <p className="modal-sub">Create a strong password to protect your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isSubmitting && <FormLoader message="Resetting your password…" />}

          <div className="form-group">
            <label className="form-label" htmlFor="newPass">New Password</label>
            <div className="relative flex items-center">
              <input
                type={showPass ? "text" : "password"}
                id="newPass"
                placeholder="••••••••"
                {...register("newPass")}
                className={`form-input ${errors.newPass ? 'border-accent-danger' : ''}`}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 text-gray-400 hover:text-gray-100"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.newPass && <p className="form-error">{errors.newPass.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPass">Confirm Password</label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPass ? "text" : "password"}
                id="confirmPass"
                placeholder="••••••••"
                {...register("confirmPass")}
                className={`form-input ${errors.confirmPass ? 'border-accent-danger' : ''}`}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 text-gray-400 hover:text-gray-100"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                {showConfirmPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.confirmPass && <p className="form-error">{errors.confirmPass.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-submit"
            style={{ marginTop: '1rem' }}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
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
