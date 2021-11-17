import express from "express";
import ItemsController from "./item.controller";

export const itemsRouter = express.Router();

itemsRouter.get("/", ItemsController.getAllItems);
itemsRouter.get("/:id", ItemsController.getItemById);
itemsRouter.post("/", ItemsController.createItem);
itemsRouter.put("/:id", ItemsController.updateItem);
itemsRouter.delete("/:id", ItemsController.deleteItem);
