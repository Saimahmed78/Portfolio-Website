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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            First Name
          </label>
          <input
            type="text"
            placeholder="John"
            {...register("firstName")}
            className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/70 text-gray-100 placeholder-gray-400 
              focus:outline-none focus:border-blue-400 focus:shadow-[0_0_12px_rgba(94,158,255,0.6)] transition"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            {...register("secondName")}
            className="w-[50%] px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/70 text-gray-100 placeholder-gray-400 
              focus:outline-none focus:border-blue-400 focus:shadow-[0_0_12px_rgba(94,158,255,0.6)] transition"
          />
          {errors.secondName && (
            <p className="text-red-400 text-sm">{errors.secondName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/70 text-gray-100 placeholder-gray-400 
              focus:outline-none focus:border-blue-400 focus:shadow-[0_0_12px_rgba(94,158,255,0.6)] transition"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Type your message..."
            {...register("message")}
            className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/70 text-gray-100 placeholder-gray-400 
              focus:outline-none focus:border-blue-400 focus:shadow-[0_0_12px_rgba(94,158,255,0.6)] transition"
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-3 rounded-2xl font-semibold text-white 
            bg-gradient-to-r from-blue-500 to-indigo-600 
            shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {isSubmitSuccessful && (
        <p className="mt-4 text-green-400 font-medium">
          Message sent successfully!
        </p>
      )}
    </>
  );
}
