import express from "express";
import AuthController from "./auth.controller";
import {
  validate,
  registrationSchema,
} from "../middleware/validator.middleware";

export const authRouter = express.Router();

authRouter.post(
  "/signup",
  validate({ body: registrationSchema }),
  AuthController.signup
);

authRouter.post("/login", AuthController.login);
