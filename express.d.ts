import { IBaseUser } from "./src/users/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
