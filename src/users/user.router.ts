import express from "express";
import UsersController from "./user.controller";
import {
  validate,
  registrationSchema,
} from "../middleware/validator.middleware";

export const usersRouter = express.Router();

usersRouter.get("/", UsersController.getAllUsers);
usersRouter.get("/:id", UsersController.getUserById);
usersRouter.post(
  "/",
  validate({ body: registrationSchema }),
  UsersController.createUser
);
usersRouter.put("/:id", UsersController.updateUser);
usersRouter.delete("/:id", UsersController.deleteUser);
