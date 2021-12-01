import { NextFunction, Request, Response } from "express";
import { IItem, IBaseItem } from "./item.interface";
import * as ItemService from "./item.service";
import { ApplicationError } from "../common/http-exception";

export default {
  getAllItems: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const items: Array<IItem> = await ItemService.getAll();
      res.status(200).send(items);
    } catch (error) {
      next(error);
    }
  },

  getItemById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id: string = req.params.id;

    try {
      const item: IItem | null = await ItemService.get(id);

      if (!item) {
        throw new ApplicationError(404, "item not found");
        //res.status(404).send("item not found");
      }
      return res.status(200).send(item);
    } catch (error) {
      next(error);
    }
  },

  createItem: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const item: IBaseItem = req.body;
      const newItem = await ItemService.create(item);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },

  updateItem: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
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
    } catch (error) {
      next(error);
    }
  },

  deleteItem: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const id: string = req.params.id;
      const deletedItem = await ItemService.remove(id);
      if (deletedItem) {
        res.status(202).json(deletedItem);
      } else {
        res.status(404).send("Resource doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  },
};
