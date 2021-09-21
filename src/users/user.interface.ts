import { Document } from "mongoose";

export interface IBaseUser {
  name: string;
  password: string;
  email: string;
}

export interface IUser extends IBaseUser, Document {
  _id: string;
}
