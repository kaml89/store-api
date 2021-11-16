import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser, IUser } from "./user.interface";
import jwt from "express-jwt";
import {
  validate,
  registrationSchema,
} from "../middleware/validator.middleware";

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users: Array<IUser> = await UserService.getAll();

    res.status(200).send(users);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const user: IUser | null = await UserService.getById(id);

    if (user) {
      return res.status(200).send(user);
    }

    res.status(404).send("user not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

usersRouter.post(
  "/",
  validate({ body: registrationSchema }),
  async (req: Request, res: Response) => {
    try {
      const user: IBaseUser = req.body;
      const newUser = await UserService.create(user);

      res.status(201).json(newUser);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

usersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const userUpdate: IBaseUser = req.body;

    const existingUser: IUser | null = await UserService.getById(id);

    if (existingUser) {
      const updatedUser = await UserService.update(id, userUpdate);
      res.status(200).json(updatedUser);
    }

    const newUser: IUser = await UserService.create(userUpdate);
    res.status(201).json(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletedUser = UserService.remove(id);

    res.status(204).json(deletedUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
