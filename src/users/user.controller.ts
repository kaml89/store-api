import { NextFunction, Request, Response } from "express";
import * as UserService from "./user.service";
import { IBaseUser, IUser } from "./user.interface";
import { ApplicationError } from "../common/http-exception";
import app from "index";

export default {
  getAllUsers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const users: Array<IUser> = await UserService.getAll();

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id: string = req.params.id;

    try {
      const user: IUser | null = await UserService.getById(id);

      if (!user) {
        throw new ApplicationError(404, "user not found");
        //res.status(404).send("user not found");
      }

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user: IBaseUser = req.body;
      const newUser = await UserService.create(user);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const id: string = req.params.id;
      const userUpdate: IBaseUser = req.body;

      const existingUser: IUser | null = await UserService.getById(id);

      if (!existingUser) {
        throw new ApplicationError(404, "User not found");
      }

      const updatedUser = await UserService.update(id, userUpdate);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const id: string = req.params.id;
      const deletedUser = UserService.remove(id);

      res.status(204).json(deletedUser);
    } catch (error) {
      next(error);
    }
  },
};
