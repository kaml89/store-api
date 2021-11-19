import { Request, Response, NextFunction } from "express";
import jwt from "express-jwt";
import jwtDecode from "jwt-decode";
import * as dotenv from "dotenv";
import * as UserService from "../users/user.service";
import { IUser } from "../users/user.interface";

dotenv.config();

export const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("authorization");
  if (token) {
    req.user = jwtDecode(token.substring(7));
    return next();
  }
  return next();
};

export const requireAuth = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

export const checkRoles = (roles: Array<string>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id: string = req.user.id;
    const user: IUser | null = await UserService.getById(id);
    if (!user) {
      res.status(401).send("Unauthorized user");
    }
    if (roles.indexOf(req.user.role) > -1) {
      return next();
    } else {
      res.status(401).send("Unauthorized user");
    }
  };
};
