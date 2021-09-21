import { IBaseUser, IUser } from "./user.interface";
import mongoose, { Schema, Model } from "mongoose";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
