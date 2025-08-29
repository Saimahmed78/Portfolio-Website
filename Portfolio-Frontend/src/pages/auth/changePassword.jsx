import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import apiClient from "../../../service/apiClient";
import { changePassSchema } from "../../schemas/authSchema";

// Zod schema for password change

function ChangePass() {
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
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="oldPass">Old Password</label>
      <input
        type="password"
        id="oldPass"
        placeholder="Enter your Old Password"
        {...register("oldPass")}
      />
      {errors.oldPass && <p className="error">{errors.oldPass.message}</p>}

      <label htmlFor="newPass">New Password</label>
      <input
        type="password"
        id="newPass"
        placeholder="Enter your New Password"
        {...register("newPass")}
      />
      {errors.newPass && <p className="error">{errors.newPass.message}</p>}

      <label htmlFor="confirmPass">Confirm Password</label>
      <input
        type="password"
        id="confirmPass"
        placeholder="Confirm your Password"
        {...register("confirmPass")}
      />
      {errors.confirmPass && <p className="error">{errors.confirmPass.message}</p>}

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default ChangePass;
