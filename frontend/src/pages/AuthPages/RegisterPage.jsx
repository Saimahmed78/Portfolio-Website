import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../services/apiClient";
import { registerSchema } from "../../schemas/authSchema";

export default function RegisterUser() {
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
      const response = await apiClient.register(data.name, data.email, data.password);
      toast.success(response?.data || "Account Created ✅");
      reset();
      navigate("/verifyEmail");
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
    } catch (error) {
      const msg = error?.response?.data?.message || "Registration failed.";
      toast.error(msg);
      if (error?.statusCode === 409) {
        setError("email", { type: "manual", message: msg });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`relative flex flex-col gap-4 w-full max-w-md p-8 bg-[#1e293b] rounded-2xl shadow-xl animate-fadeIn
      ${isSubmitting ? "before:absolute before:top-0 before:left-[-100%] before:w-full before:h-[3px] before:bg-gradient-to-r before:from-blue-500 before:via-cyan-400 before:to-yellow-400 before:animate-flow" : ""}`}
    >
      {/* Name */}
      <label className="text-sm font-medium text-slate-200">Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        {...register("name")}
        className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 transition"
      />
      <p className="text-red-500 text-xs mt-[-4px]">{errors.name?.message || " "}</p>

      {/* Email */}
      <label className="text-sm font-medium text-slate-200">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 transition"
      />
      <p className="text-red-500 text-xs mt-[-4px]">{errors.email?.message || " "}</p>

      {/* Password */}
      <label className="text-sm font-medium text-slate-200">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password")}
          className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-600 bg-slate-800 text-white focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <p className="text-red-500 text-xs mt-[-4px]">{errors.password?.message || " "}</p>

      {/* Forgot Password */}
      <p className="flex justify-end text-xs text-slate-300">
        <Link className="text-blue-500 hover:text-blue-600" to="/forgotPass">
          Forgot Password?
        </Link>
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:animate-pulse transition"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {/* Already have account */}
      <p className="text-sm text-slate-300 text-center">
        Already have an account?{" "}
        <Link className="text-blue-500 hover:text-blue-600 font-semibold" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
