import express, { Request, Response } from "express";
import * as UserService from "../users/user.service";
import { IBaseUser, IUser } from "../users/user.interface";
import bcrypt from "bcrypt";
import { createToken } from "../utils/utils";
import {
  validate,
  registrationSchema,
} from "../middleware/validator.middleware";

export const authRouter = express.Router();

authRouter.post(
  "/signup",
  validate({ body: registrationSchema }),
  async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const existingUser: IUser | null = await UserService.getByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "Email already exists" });
      }
      const newUser: IBaseUser = {
        name: name,
        email: email,
        password: password,
      };

      const savedUser: IUser = await UserService.create(newUser);

      const userInfo = {
        name: savedUser.name,
        email: savedUser.email,
        id: savedUser.id,
      };

      res.status(200).json({
        message: "User succesfully created",
        user: userInfo,
      });
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await UserService.getByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user!.password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid Password" });
    }

    const token = createToken(user!);

    const responseObject = {
      token,
      user,
    };

    res.status(200).json(responseObject);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
