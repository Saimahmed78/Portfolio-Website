import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});


const sendMail = async (options) => {
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  const emailBody = mailGenerator.generate(options.mailGenContent);
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  const mailOptions = {
  from: `"YourApp Name 👻" <${process.env.FROM_EMAIL}>`,
  to: options.email,
  subject: options.subject,
  text: emailText,
  html: emailBody,
};


  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent Sucessfully");
  } catch (error) {
    console.log("Email not sent", error);
  }
};

const emailVerificationContent = (username, verificationURL) => ({
  body: {
    name: username,
    intro: "Welcome to My Portfolio Website! We're thrilled to have you onboard.",
    action: {
      instructions: "Please verify your account by clicking the button below:",
      button: {
        color: "#22BC66",
        text: "Verify Account",
        link: verificationURL,
      },
    },
    outro: "Need help or have questions? Just reply to this email, we'd love to assist you.",
  },
});

const emailVerificationConfirmationContent = (username) => ({
  body: {
    name: username,
    intro: "Your account has been successfully verified! 🎉",
    outro: "You can now log in and start using the platform.",
  },
});

const forgotPasswordEmailContent = (username, resetPassUrl) => ({
  body: {
    name: username,
    intro: "We received a request to reset your password.",
    action: {
      instructions: "Click the button below to reset your password:",
      button: {
        color: "#22BC66",
        text: "Reset Password",
        link: resetPassUrl,
      },
    },
    outro: "If you didn't request this, please ignore this email.",
  },
});

const resetPasswordEmailContent = (username) => ({
  body: {
    name: username,
    intro: "Your password has been successfully changed.",
    outro: "If you did not perform this action, please contact support immediately.",
  },
});

const changePasswordEmailContent = (username) => ({
  body: {
    name: username,
    intro: "You have successfully updated your password.",
    outro: "If this wasn't you, please secure your account immediately.",
  },
});

const accountDeletionEmailContent = (username) => ({
  body: {
    name: username,
    intro: "Your account has been successfully deleted.",
    outro: "We're sorry to see you go. If this was a mistake, contact support as soon as possible.",
  },
});


export {
  sendMail,
  emailVerificationContent,
  emailVerificationConfirmationContent,
  forgotPasswordEmailContent,
  resetPasswordEmailContent,
  changePasswordEmailContent,
  accountDeletionEmailContent,
};
