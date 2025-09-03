import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import apiClient from "../../../service/apiClient";
import { resendVerifySchema } from "../../schemas/authSchema";

import "./styles/resendVerification.css";

function ResendVerification() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resendVerifySchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.resendVerifyEmail(data.email);
      if (response?.success === true) {
        toast.success("Verification Email sent successfully ✅");
        setSuccess(true);
        reset();
      } else {
        toast.error("Something went wrong from the server ❌");
      }
    } catch (error) {
      console.error("Error in resend: ", error);
      toast.error(error?.message || "Something went wrong in resend request");
    }
  };

  return (
    <div className="resend-container">
      <div className="resend-card" role="region" aria-labelledby="resend-title">
        {success ? (
          <div className="resend-success" role="status" aria-live="polite">
            <h1 className="resend-success-title">✅ Email Sent!</h1>
            <p className="resend-success-subtitle">
              Please check your inbox for the verification email.
            </p>
          </div>
        ) : (
          <>
            <div className="resend-header">
              <h1 id="resend-title" className="resend-title">
                Resend Verification
              </h1>
              <p className="resend-subtitle">
                Didn’t receive the verification email? Enter your email address
                below and we’ll send it again.
              </p>
            </div>

            <form className="resend-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
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
                  className={`form-input ${errors.email ? "form-input--error" : ""}`}
                />
                {errors.email && (
                  <p id="email-error" className="form-error" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-btn ${isSubmitting ? "submit-btn--loading" : ""}`}
              >
                {isSubmitting && <span className="spinner" aria-hidden="true" />}
                <span>{isSubmitting ? "Sending..." : "Send Verification Email"}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResendVerification;
