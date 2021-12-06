"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var http_exception_1 = require("../common/http-exception");
var express_json_validator_middleware_1 = require("express-json-validator-middleware");
var errorHandler = function (error, req, res, next) {
    if (error.name === "UnauthorizedError") {
        return res.status(401).json(error);
    }
    if (error instanceof express_json_validator_middleware_1.ValidationError) {
        return res.status(400).json({
            errors: error.validationErrors,
        });
    }
    if (error.name === "ValidationError") {
        return res.status(400).json(error.message);
    }
    if (error instanceof http_exception_1.ApplicationError) {
        console.error(error);
        return res.status(error.statusCode).send(error.message);
    }
    console.error(error);
    res.status(500).send(error);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map