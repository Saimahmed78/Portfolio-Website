import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  secondName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message cannot be empty"),
});

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 max-[480px]:flex-col">
          {/* First Name */}
          <div className="form-group flex-1">
            <label className="form-label">First Name</label>
            <input
              type="text"
              placeholder="John"
              {...register("firstName")}
              className="form-input"
            />
            {errors.firstName && (
              <div className="form-error">{errors.firstName.message}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group flex-1">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              {...register("secondName")}
              className="form-input"
            />
            {errors.secondName && (
              <div className="form-error">{errors.secondName.message}</div>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="form-input"
          />
          {errors.email && (
            <div className="form-error">{errors.email.message}</div>
          )}
        </div>

        {/* Message */}
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
            rows={5}
            placeholder="Type your message..."
            {...register("message")}
            className="form-input"
            style={{ resize: "vertical", padding: "0.8rem 1rem" }}
          />
          {errors.message && (
            <div className="form-error">{errors.message.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-submit mt-2"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {isSubmitSuccessful && (
        <p className="mt-4 text-[var(--accent-success)] font-medium text-sm">
          Message sent successfully!
        </p>
      )}
    </>
  );
}
