import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser, IUser } from "./user.interface";

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
    const user: IUser | null = await UserService.get(id);

    if (user) {
      return res.status(200).send(user);
    }

    res.status(404).send("item not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user: IBaseUser = req.body;
    const newUser = await UserService.create(user);

    res.status(201).json(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});