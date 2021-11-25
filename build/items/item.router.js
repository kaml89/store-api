"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
var express_1 = __importDefault(require("express"));
var item_controller_1 = __importDefault(require("./item.controller"));
var auth_middleware_1 = require("../middleware/auth.middleware");
var roles_enum_1 = __importDefault(require("../common/roles.enum"));
exports.itemsRouter = express_1.default.Router();
exports.itemsRouter.get("/", item_controller_1.default.getAllItems);
exports.itemsRouter.get("/:id", item_controller_1.default.getItemById);
exports.itemsRouter.post("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin]), item_controller_1.default.createItem);
exports.itemsRouter.put("/:id", auth_middleware_1.requireAuth, (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin]), item_controller_1.default.updateItem);
exports.itemsRouter.delete("/:id", auth_middleware_1.requireAuth, (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin]), item_controller_1.default.deleteItem);
//# sourceMappingURL=item.router.js.map