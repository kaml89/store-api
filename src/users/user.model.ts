import { IBaseUser, IUser } from "./user.interface";
import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import Role from "../common/roles.enum";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    enum: ["guest", "user", "admin"],
    default: "guest",
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
