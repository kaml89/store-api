import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  response.status(400).json({
    errors: error.validationErrors,
  });

  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};
