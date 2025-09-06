import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { useState } from "react";
import { loginSchema } from "../../schemas/authSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import layoutStyles from "../../layouts/Auth/AuthFormLayout.module.css"; // form-related styles
import sharedStyles from "../../layouts/Auth/AuthShared.module.css"; // form-related styles

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.login(data.email, data.password);

      if (response?.data) {
        toast.success("Logged in successfully ✅ Redirecting...");
        reset();
        navigate("/");
      } else {
        toast.error("Unexpected response from server ❌");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Login failed ❌";
      toast.error(msg);
    }
  };

  return (
    <>
      <form
        className={`${layoutStyles["auth-form"]} ${
          isSubmitting ? layoutStyles.loading : ""
        }`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className={layoutStyles["auth-error"]}>{errors.email.message}</p>
        )}

        {/* Password */}
        <label htmlFor="password">Password</label>
        <div className={layoutStyles["auth-password-wrapper"]}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className={layoutStyles["auth-toggle-password"]}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className={layoutStyles["auth-error"]}>
            {errors.password.message}
          </p>
        )}

        <div className={layoutStyles["auth-options"]}>
          <Link to="/forgotPass">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          className={sharedStyles["auth-submit-btn"]}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className={layoutStyles["auth-text"]}>
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
