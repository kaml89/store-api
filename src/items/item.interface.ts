import { Document } from "mongoose";

export interface IBaseItem {
  name: string;
  price: number;
  description: string;
  isOnSale: boolean;
  stockCount: number;
  imgUrl: string;
}

export interface IItem extends IBaseItem, Document {
  _id: string;
}
