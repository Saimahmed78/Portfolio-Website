import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractederrors = [];
  errors.array().map((err) => {
    extractederrors.push({
      [err.path]: err.msg,
    });
  });
  return res
    .status(200)
    .json(new ApiError(400, "Validation failed", extractederrors));
};

export default validateRequest;
