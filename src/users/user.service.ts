import { IBaseUser, IUser } from "./user.interface";
import User from "./user.model";
import mongoose from "mongoose";

export const getAll = async (): Promise<IUser[]> => {
  const users: Array<IUser> = await User.find({});
  return users;
};

export const get = async (id: string): Promise<IUser | null> => {
  const user: IUser | null = await User.findById(id);
  return user;
};

export const create = async (user: IBaseUser): Promise<IUser> => {
  const newUser: IUser = new User(user);
  const createdUser: IUser = await newUser.save();

  return createdUser;
};
