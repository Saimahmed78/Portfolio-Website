import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { resetPassSchema } from "../../schemas/authSchema";
import formStyles from "../../layouts/Auth/AuthFormLayout.module.css"; // form-specific styles

function ResetPassword() {
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
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.resetPass(
        token,
        data.newPass,
        data.confirmPass
      );

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
    <form
      className={formStyles["auth-form"]}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="oldPass">Old Password</label>
      <input
        type="password"
        id="oldPass"
        {...register("oldPass")}
        className={formStyles.input}
      />
      {errors.oldPass && (
        <p className={formStyles["auth-error"]}>{errors.oldPass.message}</p>
      )}

      <label htmlFor="newPass">New Password</label>
      <input
        type="password"
        id="newPass"
        {...register("newPass")}
        className={formStyles.input}
      />
      {errors.newPass && (
        <p className={formStyles["auth-error"]}>{errors.newPass.message}</p>
      )}

      <label htmlFor="confirmPass">Confirm Password</label>
      <input
        type="password"
        id="confirmPass"
        {...register("confirmPass")}
        className={formStyles.input}
      />
      {errors.confirmPass && (
        <p className={formStyles["auth-error"]}>{errors.confirmPass.message}</p>
      )}

      <button
        type="submit"
        className={formStyles["auth-submit-btn"]}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default ResetPassword;
