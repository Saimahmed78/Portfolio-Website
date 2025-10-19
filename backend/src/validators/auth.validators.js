import { body } from "express-validator";

const userRegistrationValidators = () => {
  return [
    // ----------------- NAME -----------------
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required") //  empty check
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be 2–50 characters long") //  min/max length
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name should only contain alphabets and spaces") //  only alphabets + spaces
      .escape() //  prevent XSS
      .stripLow(true), //  remove hidden chars

    // ----------------- EMAIL -----------------
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail({ gmail_remove_dots: false })
      .customSanitizer((value) => value.toLowerCase()),

    // // ----------------- PASSWORD -----------------
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain at least one special character")
      .blacklist("<>\"'%;)(&+"),

    // ----------------- CONFIRM PASSWORD -----------------
    body("confirmPass")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Both passwords must match");
        }
        return true;
      })
      .blacklist("<>\"'%;)(&+"),
  ];
};
const resendVerifcationEmailValidators = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is requried")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};
const userloginValidators = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is requried")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").trim().notEmpty().withMessage("Password is requried"),
  ];
};

const forgotPassValidators = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is requried")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};
const resetPassValidators = () => {
  return [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain at least one special character")
      .blacklist("<>\"'%;)(&+"),

    // ----------------- CONFIRM PASSWORD -----------------
    body("confirmPass")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Both passwords must match");
        }
        return true;
      }),
  ];
};
const changePassValidators = () => {
  return [
    // ----------------- OLD PASSWORD -----------------
    body("oldPass")
      .trim()
      .notEmpty()
      .withMessage("Old Password is required")
      .blacklist("<>\"'%;)(&+"),

    // ----------------- NEW PASSWORD -----------------
    body("newPass")
      .trim()
      .notEmpty()
      .withMessage("New Password is required")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain at least one special character")
      .blacklist("<>\"'%;)(&+"),

    // ----------------- CONFIRM NEW PASSWORD -----------------
    body("confirmPass")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.newPass) {
          throw new Error("Both passwords must match");
        }
        return true;
      })
      .blacklist("<>\"'%;)(&+"),
  ];
};

const accountDeletionValidators = () => {
  return [
    body("password").trim().notEmpty().withMessage("Password is requried"),
  ];
};

export {
  userRegistrationValidators,
  resendVerifcationEmailValidators,
  userloginValidators,
  forgotPassValidators,
  resetPassValidators,
  changePassValidators,
  accountDeletionValidators,
};
