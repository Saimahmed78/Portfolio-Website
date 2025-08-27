import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
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
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
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

const emailVerificationContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to My Portfolio Website! We're very excited to have you on board.",
      action: {
        instructions: "To get started with US, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
const emailVerificationConfirmationContent = (username) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Management System! We're very excited to have you on board.",
      action: {
        instructions: "To get started with US, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your account",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordEmailContent = (username, resetPassUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Management System! We're very excited to have you on board.",
      action: {
        instructions: "To get started with US, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: resetPassUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const resetPasswordEmailContent = (username, resetPassUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Management System! You have successfully changed your password.",
      action: {
        instructions: "To get started with US, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: resetPassUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
const changePasswordEmailContent = (username, resetPassUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Management System! You have successfully changed your password.",
      action: {
        instructions: "To get started with US, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: resetPassUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const accountDeletionEmailContent = (username, resetPassUrl) => {
  return {
    body: {
      name: username,
      intro: "You have Successfully deleted your account",
      action: {
        instructions: "To get started with US, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: resetPassUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  sendMail,
  emailVerificationContent,
  emailVerificationConfirmationContent,
  forgotPasswordEmailContent,
  resetPasswordEmailContent,
  changePasswordEmailContent,
  accountDeletionEmailContent,
};
