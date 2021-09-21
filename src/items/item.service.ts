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

export const create = async (item: IBaseItem): Promise<IItem> => {
  const newItem: IItem = new Item(item);
  const createdItem: IItem = await newItem.save();

  return createdItem;
};

export const update = async (
  id: string,
  itemUpdate: IBaseItem
): Promise<IItem | null> => {
  const updatedItem = await Item.findByIdAndUpdate(id, itemUpdate);
  return updatedItem;
};

export const remove = async (id: string): Promise<IItem | null> => {
  const deletedItem = await Item.findByIdAndDelete(id);
  return deletedItem;
};
