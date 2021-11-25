"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_router_1 = require("./users/user.router");
var item_router_1 = require("./items/item.router");
var auth_router_1 = require("./auth/auth.router");
var error_middleware_1 = require("./middleware/error.middleware");
var not_found_middleware_1 = require("./middleware/not-found.middleware");
var auth_middleware_1 = require("./middleware/auth.middleware");
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
var PORT = parseInt(process.env.PORT, 10);
var MONGODB_URI = (process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI);
// const MONGODB_URI = config.MONGODB_URI as string;
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(auth_middleware_1.tokenExtractor);
app.use("/users", user_router_1.usersRouter);
app.use("/items", item_router_1.itemsRouter);
app.use("/", auth_router_1.authRouter);
app.use("*", not_found_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
app.use(not_found_middleware_1.notFoundHandler);
app.listen(PORT, function () {
    console.log("Listening on PORT " + PORT + " in " + process.env.NODE_ENV + " mode");
});
mongoose_1.default.connect(MONGODB_URI).then(function () {
    console.log("Connected to database");
}, function (err) {
    console.log("Failed to connect to database");
});
exports.default = app;
//# sourceMappingURL=index.js.map