import z from "zod";

// Zod schema (can later move to separate file)
const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().min(1, "Email is required ").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(19, "Password should be less than 20 characters"),
});

const resetPassSchema = z
  .object({
    oldPass: z.string().min(6, "Old password must be at least 6 characters"),
    newPass: z.string().min(6, "New password must be at least 6 characters"),
    confirmPass: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords must match",
    path: ["confirmPass"],
  });

const forgotPassSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email should not be empty"),
  password: z.string().min(1, "Password should not be empty"),
});

const resendVerifySchema = z.object({
  email: z.email("Invalid email address"),
});

// Zod schema for ChangePass form
const changePassSchema = z
  .object({
    oldPass: z.string().min(6, "Old password must be at least 6 characters"),
    newPass: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(50, "Password is too long"),
    confirmPass: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    path: ["confirmPass"],
    message: "Passwords must match",
  });

export {
  registerSchema,
  resetPassSchema,
  forgotPassSchema,
  loginSchema,
  resendVerifySchema,
  changePassSchema,
};
