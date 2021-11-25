"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("./user.controller"));
var validator_middleware_1 = require("../middleware/validator.middleware");
var auth_middleware_1 = require("../middleware/auth.middleware");
var roles_enum_1 = __importDefault(require("../common/roles.enum"));
exports.usersRouter = express_1.default.Router();
exports.usersRouter.get("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin]), user_controller_1.default.getAllUsers);
exports.usersRouter.get("/:id", auth_middleware_1.requireAuth, (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin, roles_enum_1.default.User]), user_controller_1.default.getUserById);
exports.usersRouter.post("/", (0, validator_middleware_1.validate)({ body: validator_middleware_1.registrationSchema }), user_controller_1.default.createUser);
exports.usersRouter.put("/:id", auth_middleware_1.requireAuth, (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin, roles_enum_1.default.User]), user_controller_1.default.updateUser);
exports.usersRouter.delete("/:id", (0, auth_middleware_1.checkRoles)([roles_enum_1.default.Admin, roles_enum_1.default.User]), user_controller_1.default.deleteUser);
//# sourceMappingURL=user.router.js.map