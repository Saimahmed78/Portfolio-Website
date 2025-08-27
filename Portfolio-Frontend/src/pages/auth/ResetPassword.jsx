import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import apiClient from "../../../service/apiClient";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { resetPassSchema } from "../../schemas/authSchema";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resetPassSchema),
    mode: "onBlur", // validate on blur
    reValidateMode: "onChange", // remove error on typing
  });
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Both passwords must match");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.resetPass(
        token,
        data.password,
        data.confirmPassword,
      );
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
    <>
      <form
        className={`contact-form ${isSubmitting ? "loading" : ""}`}
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Password */}
        <label htmlFor="password">Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{ marginLeft: "8px", cursor: "pointer" }}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}

        {/* Confirm Password */}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showConfirmPass ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            style={{ marginLeft: "8px", cursor: "pointer" }}
          >
            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}
export default ResetPassword;
