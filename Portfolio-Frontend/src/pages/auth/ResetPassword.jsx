import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    setLoading(true);
    try {
      const response = await apiClient.resetPass(token, data.newPass, data.confirmPass);

      if (response.statuscode >= 200 && response.statuscode < 300) {
        toast.success("Password reset successfully ✅");
        navigate("/login");
        reset();
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      toast.error(error.message || "Password reset failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className={`contact-form ${isSubmitting ? "loading" : ""}`}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Password */}
        <label htmlFor="password">Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            {...register("newPass")}
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
        {errors.newPass && <p className="error">{errors.newPass.message}</p>}

        {/* Confirm Password */}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showConfirmPass ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPass")}
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
        {errors.confirmPass && (
          <p className="error">{errors.confirmPass.message}</p>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}
export default ResetPassword;
