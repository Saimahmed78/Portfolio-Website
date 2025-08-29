import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import { resendVerifySchema } from "../../schemas/authSchema";

function ResendVerification() {
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
      console.log("Resend verification request", response);

      if (response?.success === true) {
        toast.success("Verification Email sent successfully ✅");
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
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email here"
        {...register("email")}
      />
      {errors.email && <p className="error-text">{errors.email.message}</p>}

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ResendVerification;
