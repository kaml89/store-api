import { NextFunction, Request, Response } from "express";
import { IItem, IBaseItem } from "./item.interface";
import * as ItemService from "./item.service";

export default {
  getAllItems: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items: Array<IItem> = await ItemService.getAll();

      res.status(200).send(items);
    } catch (err: any) {
      next(err);
    }
  },

  getItemById: async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;

    try {
      const item: IItem | null = await ItemService.get(id);

      if (item) {
        return res.status(200).send(item);
      }

      res.status(404).send("item not found");
    } catch (err: any) {
      next(err);
    }
  },

  createItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item: IBaseItem = req.body;
      const newItem = await ItemService.create(item);
      res.status(201).json(newItem);
    } catch (err: any) {
      next(err);
    }
  },

  updateItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const itemUpdate: IBaseItem = req.body;

      const existingItem: IItem | null = await ItemService.get(id);

      if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
        res.status(200).json(updatedItem);
      }

      const newItem: IItem = await ItemService.create(itemUpdate);
      res.status(201).json(newItem);
    } catch (err: any) {
      next(err);
    }
  },

  deleteItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deletedItem = await ItemService.remove(id);
      if (deletedItem) {
        res.status(202).json(deletedItem);
      } else {
        res.status(404).send("Resource doesn't exist");
      }
    } catch (err: any) {
      next(err);
    }
  },
};
