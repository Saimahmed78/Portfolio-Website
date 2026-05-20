import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "PollForge",
    link: process.env.CLIENT_URL || "http://localhost:5173",
  },
});

const generate = (content) => ({
  html: mailGenerator.generate(content),
  text: mailGenerator.generatePlaintext(content),
});

export const emailVerificationContent = (username, verificationURL) =>
  generate({
    body: {
      name: username,
      intro: "Welcome! We're thrilled to have you onboard.",
      action: {
        instructions: "Please verify your account by clicking below:",
        button: {
          color: "#22BC66",
          text: "Verify Account",
          link: verificationURL,
        },
      },
      outro: "Need help? Just reply to this email.",
    },
  });

export const emailVerificationConfirmationContent = (username) =>
  generate({
    body: {
      name: username,
      intro: "Your account has been successfully verified! 🎉",
      outro: "You can now log in and start using the platform.",
    },
  });

export const forgotPasswordEmailContent = (username, resetPassUrl) =>
  generate({
    body: {
      name: username,
      intro: "We received a request to reset your password.",
      action: {
        instructions: "Click below to reset your password:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: resetPassUrl,
        },
      },
      outro: "If you didn't request this, please ignore.",
    },
  });

export const resetPasswordEmailContent = (username) =>
  generate({
    body: {
      name: username,
      intro: "Your password has been successfully changed.",
      outro: "If you didn’t do this, please contact support immediately.",
    },
  });

export const changePasswordEmailContent = (username) =>
  generate({
    body: {
      name: username,
      intro: "You updated your password.",
      outro: "If this wasn’t you, secure your account immediately.",
    },
  });

export const accountDeletionEmailContent = (username) =>
  generate({
    body: {
      name: username,
      intro: "Your account has been successfully deleted.",
      outro:
        "Sorry to see you go. If this was a mistake, contact support ASAP.",
    },
  });

export const pollCreationEmailContent = (username, pollTitle, pollLink) =>
  generate({
    body: {
      name: username,
      intro: `Congratulations! Your poll "${pollTitle}" has been successfully created.`,
      action: {
        instructions: "You can view and share your poll using the link below:",
        button: {
          color: "#10b981", // Using our emerald primary color
          text: "View Poll",
          link: pollLink,
        },
      },
      outro: "We hope you gather great insights!",
    },
  });

export const pollResultsPublishedEmailContent = (username, pollTitle, resultsLink) =>
  generate({
    body: {
      name: username,
      intro: `Great news! The results for the form/poll "${pollTitle}" you filled out have been published by the creator.`,
      action: {
        instructions: "You can now view the detailed results and analysis using the link below:",
        button: {
          color: "#4f46e5", // Indigo primary brand color
          text: "View Results",
          link: resultsLink,
        },
      },
      outro: "Thank you for sharing your feedback and being a part of this survey!",
    },
  });

