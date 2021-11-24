import express from "express";
import UsersController from "./user.controller";
import {
  validate,
  registrationSchema,
} from "../middleware/validator.middleware";
import { requireAuth, checkRoles } from "../middleware/auth.middleware";
import Role from "../common/roles.enum";

export const usersRouter = express.Router();

usersRouter.get(
  "/",
  requireAuth,
  checkRoles([Role.Admin]),
  UsersController.getAllUsers
);

usersRouter.get(
  "/:id",
  requireAuth,
  checkRoles([Role.Admin, Role.User]),
  UsersController.getUserById
);

usersRouter.post(
  "/",
  validate({ body: registrationSchema }),
  UsersController.createUser
);
usersRouter.put(
  "/:id",
  requireAuth,
  checkRoles([Role.Admin, Role.User]),
  UsersController.updateUser
);
usersRouter.delete(
  "/:id",
  checkRoles([Role.Admin, Role.User]),
  UsersController.deleteUser
);
