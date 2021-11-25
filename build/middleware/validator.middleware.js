"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = exports.validate = void 0;
var express_json_validator_middleware_1 = require("express-json-validator-middleware");
var registrationSchema = {
    type: "object",
    required: ["name", "password", "email"],
    properties: {
        name: {
            type: "string",
            minLength: 3,
        },
        password: {
            type: "string",
            minLength: 6,
        },
        email: {
            type: "string",
        },
    },
};
exports.registrationSchema = registrationSchema;
var validate = new express_json_validator_middleware_1.Validator({}).validate;
exports.validate = validate;
//# sourceMappingURL=validator.middleware.js.map