import { Document } from "mongoose";

export interface IBaseItem extends Document {
  name: string;
  price: number;
  description: string;
  isOnSale: boolean;
  stockCount: number;
  imgUrl: string;
}

export interface IItem extends IBaseItem {
  _id: string;
}
