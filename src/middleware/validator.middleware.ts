import { Validator } from "express-json-validator-middleware";
import { JSONSchema7 } from "json-schema";

const registrationSchema: JSONSchema7 = {
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

const { validate } = new Validator({});

export { validate, registrationSchema };
