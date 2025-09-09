import {
  emailVerificationContent,
  emailVerificationConfirmationContent,
  forgotPasswordEmailContent,
  resetPasswordEmailContent,
  changePasswordEmailContent,
  accountDeletionEmailContent,
} from "./mail.template.js";

import { sendMail} from "../../infrastructure/mail/mail.transporter.js";

export async function sendVerificationEmail({ name, email, verificationURL }) {
  return sendMail({
    email,
    subject: "User Verification Email",
    mailGenContent: emailVerificationContent(name, verificationURL),
  });
}

export async function sendVerificationConfirmationEmail({ email, name }) {
  return sendMail({
    email,
    subject: "Email Verification Confirmation",
    mailGenContent: emailVerificationConfirmationContent(name),
  });
}

export async function sendPasswordResetEmail({ name, email, resetURL }) {
  return sendMail({
    email,
    subject: "Reset Password Email",
    mailGenContent: forgotPasswordEmailContent(name, resetURL),
  });
}

export async function sendPasswordResetConfirmationEmail({ email, name }) {
  return sendMail({
    email,
    subject: "Password Reset Successful",
    mailGenContent: resetPasswordEmailContent(name),
  });
}

export async function sendPasswordChangeEmail({ email, name }) {
  return sendMail({
    email,
    subject: "Password Changed",
    mailGenContent: changePasswordEmailContent(name),
  });
}

export async function sendAccountDeletionEmail({ email, name }) {
  return sendMail({
    email,
    subject: "Account Deleted",
    mailGenContent: accountDeletionEmailContent(name),
  });
}