import { ApplicationError } from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";
import { MongoError } from "mongodb";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "UnauthorizedError") {
    return res.status(401).json(error);
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({
      errors: error.validationErrors,
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json(error.message);
  }

  if (error instanceof ApplicationError) {
    console.error(error);
    return res.status(error.statusCode).send(error.message);
  }

  console.error(error);

  res.status(500).send(error);
};
