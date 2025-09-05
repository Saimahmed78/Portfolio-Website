import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import { resendVerifySchema } from "../../schemas/authSchema";
import { useNavigate } from "react-router";

function ResendVerificationEmailPage() {
  const [success, setSuccess] = useState(false);
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
        setSuccess(true);
        reset();
        navigate("/resendVerifyEmail");

        // Save current timestamp in localStorage
        localStorage.setItem("lastResendTimestamp", Date.now().toString());
      } else {
        toast.error("Something went wrong from the server ❌");
      }
    } catch (error) {
      console.error("Error in resend: ", error);
      toast.error(error?.message || "Something went wrong in resend request");
    }
  };

  return (
    <>
      {success ? (
        <>
          <h1 className="auth-title">✅ Email Sent!</h1>
          <p className="auth-subtitle">
            Please check your inbox for the verification email.
          </p>
        </>
      ) : (
        <>
          <h1 className="auth-title">Resend Verification</h1>
          <p className="auth-subtitle">
            Didn’t receive the verification email? Enter your email below and we’ll send it again.
          </p>

          <form
            className={`auth-form ${isSubmitting ? "loading" : ""}`}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email here"
              autoComplete="email"
              {...register("email")}
                  aria-invalid={Boolean(errors.email) || undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`form-input ${errors.email ? "form-input--error" : ""}`}
            />
            {errors.email && <p className="auth-error">{errors.email.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
            >
                {isSubmitting && <span className="spinner" aria-hidden="true" />}
                <span>{isSubmitting ? "Sending..." : "Send Verification Email"}</span>
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default ResendVerificationEmailPage;
