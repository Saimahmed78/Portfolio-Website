import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import "./styles/register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerSchema } from "../../schemas/authSchema";

function RegisterUser() {
  const [showPassword, setShowPassword] = useState(false);

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

      const errMsg = response.data || "Account Created Successfully ✅";
      toast.success(errMsg);
      reset();
    } catch (error) {
      // General error message
      const msg =
        error?.errors?.[0] || "Registration failed. Please try again.";
      toast.error(msg);

      // Field-specific error example
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
      <input type="text" {...register("name")} placeholder="Enter your Name" />
      {errors.name && <p className="register-error">{errors.name.message}</p>}

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        {...register("email")}
        placeholder="Enter your email"
      />
      {errors.email && <p className="register-error">{errors.email.message}</p>}

      {/* Password */}
      <label htmlFor="password">Password</label>
      <div className="register-password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Enter your password"
        />
        <button
          type="button"
          className="register-toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && (
        <p className="register-error">{errors.password.message}</p>
      )}

      <p>
        <Link to="/forgotPass">Forgot Password?</Link>
      </p>

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
