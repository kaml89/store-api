import { IBaseItem, IItem } from "./item.interface";
import Item from "./item.model";
import { connect, Model } from "mongoose";

export const getAll = async (): Promise<IItem[]> => {
  const items: IItem[] = await Item.find({});
  return items;
};

export const get = async (id: string): Promise<IItem | null> => {
  const item = await Item.findById(id);
  return item;
};

export const create = async (item: IBaseItem) => {
  const newItem: IBaseItem = new Item(item);
  const createdItem = await newItem.save();

  return createdItem;
};

export const update = async () => {};
export const remove = async () => {};
