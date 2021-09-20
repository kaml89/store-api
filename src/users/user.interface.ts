import { Document } from "mongoose";

export interface IBaseUser extends Document {
  name: string;
  password: string;
  email: string;
}

export interface IUser extends IBaseUser {
  _id: string;
}
