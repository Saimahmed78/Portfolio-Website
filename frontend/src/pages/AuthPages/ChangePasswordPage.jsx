import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import apiClient from "../../../services/apiClient";
import { changePassSchema } from "../../schemas/authSchema";
import FormLoader from "../../components/FormLoader.jsx";

export default function ChangePass() {
  const { token } = useParams();
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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
      className="modal"
    >
      {/* Full-overlay loading animation */}
      {isSubmitting && <FormLoader message="Updating your password…" />}

      {/* Old Password */}
      <div className="form-group">
        <label className="form-label" htmlFor="oldPass">
          Old Password
        </label>
        <div className="relative flex items-center">
          <input
            type={showOldPass ? "text" : "password"}
            id="oldPass"
            placeholder="Enter your Old Password"
            {...register("oldPass")}
            className="form-input"
            style={{ paddingRight: "2.5rem" }}
          />
          <button
            type="button"
            onClick={() => setShowOldPass(!showOldPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-100 focus:outline-none transition-colors"
          >
            {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.oldPass && (
          <div className="form-error">{errors.oldPass.message}</div>
        )}
      </div>

      {/* New Password */}
      <div className="form-group">
        <label className="form-label" htmlFor="newPass">
          New Password
        </label>
        <div className="relative flex items-center">
          <input
            type={showNewPass ? "text" : "password"}
            id="newPass"
            placeholder="Enter your New Password"
            {...register("newPass")}
            className="form-input"
            style={{ paddingRight: "2.5rem" }}
          />
          <button
            type="button"
            onClick={() => setShowNewPass(!showNewPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-100 focus:outline-none transition-colors"
          >
            {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.newPass && (
          <div className="form-error">{errors.newPass.message}</div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label className="form-label" htmlFor="confirmPass">
          Confirm Password
        </label>
        <div className="relative flex items-center">
          <input
            type={showConfirmPass ? "text" : "password"}
            id="confirmPass"
            placeholder="Confirm your Password"
            {...register("confirmPass")}
            className="form-input"
            style={{ paddingRight: "2.5rem" }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-100 focus:outline-none transition-colors"
          >
            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPass && (
          <div className="form-error">{errors.confirmPass.message}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-submit"
      >
        Change Password
      </button>
    </form>
  );
}
