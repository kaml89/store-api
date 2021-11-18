import { Request, Response, NextFunction } from "express";
import jwt from "express-jwt";
import * as dotenv from "dotenv";

dotenv.config();

export const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("authorization");
  if (authorization) {
    req.token = authorization.substring(7);
  }
  next();
};

export const requireAuth = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});
