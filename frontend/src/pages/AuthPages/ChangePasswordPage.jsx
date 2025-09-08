import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import apiClient from "../../../services/apiClient";

import { changePassSchema } from "../../schemas/authSchema";

export default function ChangePass() {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePassSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.changePass(
        data.oldPass,
        data.newPass,
        data.confirmPass
      );

      if (response?.statuscode === 200) {
        toast.success("Password reset successfully ✅");
        reset();
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
      className={`bg-[#1e293b] p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col gap-4 relative overflow-hidden ${
        isSubmitting ? "before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-1 before:bg-gradient-to-r before:from-blue-500 before:via-cyan-400 before:to-yellow-400 before:animate-flow" : ""
      }`}
    >
      <label className="text-gray-200 font-medium text-sm" htmlFor="oldPass">
        Old Password
      </label>
      <input
        type="password"
        id="oldPass"
        placeholder="Enter your Old Password"
        {...register("oldPass")}
        className="w-full px-3 py-3 rounded-lg bg-[#334155] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#1e293b]"
      />
      {errors.oldPass && (
        <p className="text-red-500 text-sm mt-[-4px]">{errors.oldPass.message}</p>
      )}

      <label className="text-gray-200 font-medium text-sm" htmlFor="newPass">
        New Password
      </label>
      <input
        type="password"
        id="newPass"
        placeholder="Enter your New Password"
        {...register("newPass")}
        className="w-full px-3 py-3 rounded-lg bg-[#334155] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#1e293b]"
      />
      {errors.newPass && (
        <p className="text-red-500 text-sm mt-[-4px]">{errors.newPass.message}</p>
      )}

      <label className="text-gray-200 font-medium text-sm" htmlFor="confirmPass">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPass"
        placeholder="Confirm your Password"
        {...register("confirmPass")}
        className="w-full px-3 py-3 rounded-lg bg-[#334155] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#1e293b]"
      />
      {errors.confirmPass && (
        <p className="text-red-500 text-sm mt-[-4px]">{errors.confirmPass.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition-transform transform hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
