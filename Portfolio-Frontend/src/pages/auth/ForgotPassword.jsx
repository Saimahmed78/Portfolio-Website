import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import { forgotPassSchema } from "../../schemas/authSchema";
import { useState } from "react";
import Confetti from "react-confetti";
import "./styles/forgotPassword.css";

function ForgotPassword() {
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
        toast.success(
          response.data || "Forgot Password Email sent successfully ✅",
        );
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // confetti for 3s
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
    <div className="forgotPass-wrapper">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <h1 className="forgotPass-title">Forgot Password</h1>
      <p className="forgotPass-subtitle">
        Enter your email below so we can send you a password reset link.
      </p>

      <form
        className={isSubmitting ? "forgotPass-form loading" : "forgotPass-form"}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <p className="forgotPass-guideline">
          📧 Enter your email to receive a reset password link
        </p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email here"
          {...register("email")}
        />
        {errors.email && (
          <p className="forgotPass-error">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="forgotPass-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
