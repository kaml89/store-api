import { Document } from "mongoose";
import Role from "../common/roles.enum";

export interface IBaseUser {
  name: string;
  password: string;
  email: string;
  role: Role;
}

export interface IUser extends IBaseUser, Document {
  _id: string;
}
