import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../services/apiClient";
import { forgotPassSchema } from "../../schemas/authSchema";
import { useState } from "react";
import Confetti from "react-confetti";
import layoutStyles from "../../layouts/Auth/AuthFormLayout.module.css"; // form-related styles
import sharedStyles from "../../layouts/Auth/AuthShared.module.css"; // form-related styles


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
    <>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      <form
        className={`${layoutStyles["auth-form"]} ${
          isSubmitting ? layoutStyles.loading : ""
        }`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email here"
          {...register("email")}
        />
        {errors.email && (
          <p className={layoutStyles["auth-error"]}>{errors.email.message}</p>
        )}

        <button
          type="submit"
          className={sharedStyles["auth-submit-btn"]}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </>
  );
}

export default ForgotPassword;
