import { ApplicationError } from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";

export const errorHandler = (
  error: ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  }

  const isValidationError = error instanceof ValidationError;
  if (isValidationError) {
    res.status(400).json({
      errors: error.validationErrors,
    });
  }

  if (error.name === "ValidationError") {
    res.status(400).json(error);
  }

  const status = error.statusCode || error.status || 500;

  console.error(error);

  res.status(status).send(error);
};
