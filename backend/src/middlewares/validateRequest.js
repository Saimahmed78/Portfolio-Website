import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({
      [err.path]: err.msg,
    });
  });
  return res
    .status(400)
    .json(new ApiError(400, "Validation failed", extractedErrors));
};

export default validateRequest;
