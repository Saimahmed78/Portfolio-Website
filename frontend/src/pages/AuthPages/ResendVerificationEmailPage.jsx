import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { resendVerifySchema } from "../../schemas/authSchema";
import { useNavigate } from "react-router";

export default function ResendVerificationEmailPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resendVerifySchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.resendVerifyEmail(data.email);
      if (response?.success) {
        toast.success("Verification Email sent successfully ✅");
        reset();
        navigate("/verifyEmail");

        localStorage.setItem("lastResendTimestamp", Date.now().toString());
      } else {
        toast.error("Something went wrong from the server ❌");
      }
    } catch (error) {
      toast.error(
        error?.message || "Something went wrong in resend request ❌",
      );
    }
  };

  return (
    <>
    {/* Top loading line */}
      {isSubmitting && (
        <div className="absolute top-0 left-[-100%] w-full h-[3px] bg-gradient-to-r from-[#4cafef] via-blue-600 to-[#4cafef] animate-slide z-10" />
      )}
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f172a] px-5 font-inter animate-fadeIn">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-500 mb-2">
          Resend Verification
        </h1>
        <p className="text-gray-300 mb-6 text-sm">
            Didn’t receive the verification email? Enter your email below and we’ll send it again.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl flex flex-col gap-4 relative overflow-hidden"
          noValidate
        >
          <label htmlFor="email" className="text-gray-300 font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email here"
            autoComplete="email"
            {...register("email")}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`px-4 py-3 rounded-lg border text-white text-base bg-[#334155] border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-[-4px]" id="email-error">
              {errors.email.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 px-6 py-3 rounded-lg font-semibold text-white shadow transition-transform transform hover:-translate-y-1
                ${isSubmitting ? "bg-gray-500 cursor-not-allowed animate-pulse" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {isSubmitting ? "Sending..." : "Send Verification Email"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
