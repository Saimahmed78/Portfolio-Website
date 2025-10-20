import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sendMail = async ({ email, subject, mailGenContent }) => {
  const { html, text } = mailGenContent;
  const mailOptions = {
    from: `Portfolio Project 👻 <${process.env.FROM_EMAIL}>`,
    to: email,
    subject,
    html, //  This is the actual rendered email body
    text, //  Plain text version
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
