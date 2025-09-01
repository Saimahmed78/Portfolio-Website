import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import "./styles/register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerSchema } from "../../schemas/authSchema";

function RegisterUser() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
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

      const successMsg = response?.data || "Account Created Successfully ✅";
      toast.success(successMsg);
      reset();
      navigate("/verifyEmail");
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.errors?.[0] ||
        "Registration failed. Please try again.";
      toast.error(msg);

      if (error?.statusCode === 409) {
        setError("email", { type: "manual", message: msg });
      }
    }
  };

  return (
    <form
      className={`register-form ${isSubmitting ? "loading" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Name */}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        {...register("name")}
        placeholder="Enter your name"
        autoComplete="name"
        aria-invalid={!!errors.name}
      />
      <p className="register-error">{errors.name?.message || " "}</p>

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register("email")}
        placeholder="Enter your email"
        autoComplete="email"
        aria-invalid={!!errors.email}
      />
      <p className="register-error">{errors.email?.message || " "}</p>

      {/* Password */}
      <label htmlFor="password">Password</label>
      <div className="register-password-wrapper">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Enter your password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
        />
        <button
          type="button"
          className="register-toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <p className="register-error">{errors.password?.message || " "}</p>

      <p>
        <Link to="/forgotPass">Forgot Password?</Link>
      </p>

      {/* Submit */}
      <button
        type="submit"
        className="register-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default RegisterUser;
