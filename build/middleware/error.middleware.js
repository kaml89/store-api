"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var express_json_validator_middleware_1 = require("express-json-validator-middleware");
var errorHandler = function (error, req, res, next) {
    if (error.name === "UnauthorizedError") {
        res.status(401).send("Invalid token");
    }
    var isValidationError = error instanceof express_json_validator_middleware_1.ValidationError;
    if (isValidationError) {
        res.status(400).json({
            errors: error.validationErrors,
        });
    }
    if (error.name === "ValidationError") {
        res.status(400).json(error);
    }
    if (error.name === "UnauthorizedError") {
        res.status(403).json(error);
    }
    var status = error.statusCode || error.status || 500;
    console.error(error);
    res.status(status).send(error);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map