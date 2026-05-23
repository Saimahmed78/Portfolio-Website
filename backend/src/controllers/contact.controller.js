import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendContactEmail } from "../services/mail/mail.service.js";

/**
 * POST /api/v1/contact
 * Public route — no auth needed.
 * Sends the contact form details to the portfolio owner's email.
 */
export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    throw new ApiError(400, "All fields (name, email, subject, message) are required.");
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please provide a valid email address.");
  }

  await sendContactEmail({
    senderName: name.trim(),
    senderEmail: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  });

  return res.status(200).json(
    new ApiResponse(200, null, "Your message has been sent successfully! I'll get back to you soon.")
  );
});
