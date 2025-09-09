import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../services/apiClient";
import { loginSchema } from "../../schemas/authSchema";

export default function Login() {
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
      const msg = error?.errors?.[0] || "Login failed.";
      toast.error(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative flex flex-col gap-4 w-full max-w-md p-8 bg-[#1e293b] rounded-2xl shadow-xl animate-fadeIn overflow-hidden"
    >
      {/* Top loading line */}
      {isSubmitting && (
        <div className="absolute top-0 left-[-100%] w-full h-[3px] bg-gradient-to-r from-[#4cafef] via-blue-600 to-[#4cafef] animate-slide z-10" />
      )}

      {/* Email */}
      <label className="text-gray-300 font-medium text-sm" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        {...register("email")}
        placeholder="Enter your email"
        className="px-4 py-3 rounded-lg border border-gray-500 bg-[#334155] text-white text-base transition-all focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 outline-none"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-[-6px]">{errors.email.message}</p>
      )}

      {/* Password */}
      <label className="text-gray-300 font-medium text-sm" htmlFor="password">
        Password
      </label>
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password")}
          placeholder="Enter your password"
          className="px-4 py-3 rounded-lg border border-gray-500 bg-[#334155] text-white text-base w-full transition-all focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 outline-none pr-10"
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
          <p className="text-red-500 text-sm mt-[-6px]">{errors.password.message}</p>
      )}

      <div className="flex justify-end text-sm text-gray-300 mt-1">
        <Link to="/forgotPass" className="text-blue-500 hover:text-blue-600">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 px-6 py-3 rounded-lg font-semibold text-white shadow transition-transform transform hover:-translate-y-1
            ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed animate-pulse"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="mt-3 text-gray-300 text-sm text-center">
        Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
}
