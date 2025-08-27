import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import apiClient from "../../../service/apiClient";
import { forgotPassSchema } from "../../schemas/authSchema";



function ForgotPassword() {
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
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email here"
        {...register("email")}
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default ForgotPassword;
