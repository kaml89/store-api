import jwt from "jsonwebtoken";
import { IUser } from "../users/user.interface";

export const createToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET,
    { algorithm: "HS256", expiresIn: "30d" }
  );
};
