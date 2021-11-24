import express from "express";
import ItemsController from "./item.controller";
import { requireAuth, checkRoles } from "../middleware/auth.middleware";
import Role from "../common/roles.enum";

export const itemsRouter = express.Router();

itemsRouter.get("/", ItemsController.getAllItems);
itemsRouter.get("/:id", ItemsController.getItemById);

itemsRouter.post(
  "/",
  requireAuth,
  checkRoles([Role.Admin]),
  ItemsController.createItem
);

itemsRouter.put(
  "/:id",
  requireAuth,
  checkRoles([Role.Admin]),
  ItemsController.updateItem
);

itemsRouter.delete(
  "/:id",
  requireAuth,
  checkRoles([Role.Admin]),
  ItemsController.deleteItem
);
