import { Schema, model } from "mongoose";
import { Item } from "./item.interface";

const schema = new Schema<Item>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockCount: { type: Number, required: true },
  imgUrl: { type: String, required: true },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Item = model<Item>("Item", schema);

export default Item;
