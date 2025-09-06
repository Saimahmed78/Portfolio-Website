import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../services/apiClient";
import { registerSchema } from "../../schemas/authSchema";

import layoutStyles from "../../layouts/Auth/AuthFormLayout.module.css"; // form-related styles
import sharedStyles from "../../layouts/Auth/AuthShared.module.css"; // form-related styles

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
      className={`${layoutStyles["auth-form"]} ${
        isSubmitting ? layoutStyles.loading : ""
      }`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        {...register("name")}
        placeholder="Enter your name"
      />
      <p className={layoutStyles["auth-error"]}>
        {errors.name?.message || " "}
      </p>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register("email")}
        placeholder="Enter your email"
      />
      <p className={layoutStyles["auth-error"]}>
        {errors.email?.message || " "}
      </p>

      <label htmlFor="password">Password</label>
      <div className={layoutStyles["auth-password-wrapper"]}>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
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
      <p className={layoutStyles["auth-error"]}>
        {errors.password?.message || " "}
      </p>

      <p className={layoutStyles["auth-options"]}>
        <Link to="/forgotPass">Forgot Password?</Link>
      </p>

      <button
        type="submit"
        className={sharedStyles["auth-submit-btn"]}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p className={layoutStyles["auth-text"]}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default RegisterUser;
