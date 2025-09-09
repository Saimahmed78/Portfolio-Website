import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import apiClient from "../../../services/apiClient";
import { forgotPassSchema } from "../../schemas/authSchema";

export default function ForgotPassword() {
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPassSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.forgotPass(data.email);
      if (response) {
        toast.success(response.data || "Forgot Password Email sent successfully ✅");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        reset();
      } else {
        toast.error("There is something wrong from the server ❌");
      }
    } catch (error) {
      toast.error(error?.message || "Forgot password request failed ❌");
      console.error("Error in forgot password", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-4 relative overflow-hidden
          ${
            isSubmitting
              ? "before:absolute before:top-0 before:left-[-100%] before:w-full before:h-1 before:bg-gradient-to-r before:from-blue-500 before:via-cyan-400 before:to-yellow-400 before:animate-flow"
              : ""
          }`}
    >
      <label className="text-gray-300 font-medium text-sm" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email here"
        {...register("email")}
        className="px-4 py-3 rounded-lg border border-gray-500 bg-[#334155] text-white text-base transition-all focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 outline-none"
      />
        {errors.email && <p className="text-red-500 text-sm mt-[-6px]">{errors.email.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 px-6 py-3 rounded-lg font-semibold text-white shadow transition-transform transform hover:-translate-y-1
            ${isSubmitting ? "bg-gray-500 cursor-not-allowed animate-pulse" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
