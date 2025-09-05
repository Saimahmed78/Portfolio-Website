import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import { useState } from "react";
import { loginSchema } from "../../schemas/authSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
        className={`auth-form ${isSubmitting ? "loading" : ""}`}
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
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Password */}
        <label htmlFor="password">Password</label>
        <div className="auth-password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="auth-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="auth-error">{errors.password.message}</p>
        )}

        <div className="auth-options">
          <Link to="/forgotPass">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="auth-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
