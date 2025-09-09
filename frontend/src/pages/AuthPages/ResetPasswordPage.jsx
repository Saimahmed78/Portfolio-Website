import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { resetPassSchema } from "../../schemas/authSchema";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.resetPass(token, data.newPass, data.confirmPass);
      if (response.statuscode >= 200 && response.statuscode < 300) {
        toast.success("Password reset successfully ✅");
        reset();
        navigate("/login");
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      toast.error(error.message || "Password reset failed ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-4 relative overflow-hidden
          ${
            isSubmitting
              ? "before:absolute before:top-0 before:left-[-100%] before:w-full before:h-1 before:bg-gradient-to-r before:from-blue-500 before:via-cyan-400 before:to-yellow-400 before:animate-flow"
              : ""
          }`}
      noValidate
    >
      {/* Top loading line */}
      {isSubmitting && (
        <div className="absolute top-0 left-[-100%] w-full h-[3px] bg-gradient-to-r from-[#4cafef] via-blue-600 to-[#4cafef] animate-slide z-10" />
      )}
      {/* Old Password */}
      <label className="text-gray-300 font-medium text-sm" htmlFor="oldPass">
        Old Password
      </label>
      <input
        type="password"
        id="oldPass"
        {...register("oldPass")}
        placeholder="Enter your old password"
        className="px-4 py-3 rounded-lg border border-gray-500 bg-[#334155] text-white text-base transition-all focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 outline-none"
      />
      {errors.oldPass && (
          <p className="text-red-500 text-sm mt-[-6px]">{errors.oldPass.message}</p>
      )}

      {/* New Password */}
      <label className="text-gray-300 font-medium text-sm" htmlFor="newPass">
        New Password
      </label>
      <div className="relative flex items-center">
        <input
          type={showPass ? "text" : "password"}
          id="newPass"
          {...register("newPass")}
          placeholder="Enter new password"
          className="px-4 py-3 rounded-lg border border-gray-500 bg-[#334155] text-white text-base w-full transition-all focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-100"
        >
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.newPass && (
          <p className="text-red-500 text-sm mt-[-6px]">{errors.newPass.message}</p>
      )}

      {/* Confirm Password */}
        <label className="text-gray-300 font-medium text-sm" htmlFor="confirmPass">
        Confirm Password
      </label>
      <div className="relative flex items-center">
        <input
          type={showConfirmPass ? "text" : "password"}
          id="confirmPass"
          {...register("confirmPass")}
          placeholder="Confirm password"
          className="px-4 py-3 rounded-lg border border-gray-500 bg-[#334155] text-white text-base w-full transition-all focus:border-blue-500 focus:bg-[#1e293b] focus:ring-1 focus:ring-blue-500 outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPass(!showConfirmPass)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-100"
        >
          {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.confirmPass && (
          <p className="text-red-500 text-sm mt-[-6px]">{errors.confirmPass.message}</p>
      )}

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
