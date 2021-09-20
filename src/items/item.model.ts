import { Schema, model } from "mongoose";
import { IItem, IBaseItem } from "./item.interface";

export const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockCount: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isOnSale: { type: Boolean, required: true },
});

ItemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Item = model<IBaseItem>("Item", ItemSchema);

export default Item;
