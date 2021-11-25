"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("./auth.controller"));
var validator_middleware_1 = require("../middleware/validator.middleware");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/signup", (0, validator_middleware_1.validate)({ body: validator_middleware_1.registrationSchema }), auth_controller_1.default.signup);
exports.authRouter.post("/login", auth_controller_1.default.login);
//# sourceMappingURL=auth.router.js.map