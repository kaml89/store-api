import express, { Request, Response } from "express";
import { IItem, IBaseItem } from "./item.interface";
import * as ItemService from "./item.service";

export const itemsRouter = express.Router();

itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Array<IItem> = await ItemService.getAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const item: IItem | null = await ItemService.get(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: IBaseItem = req.body;
    const newItem = await ItemService.create(item);
    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.put("/:id", async (req: Request, res: Response) => {
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
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletedItem = await ItemService.remove(id);
    if (deletedItem) {
      res.status(202).json(deletedItem);
    } else {
      res.status(404).send("Resource doesn't exist");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
