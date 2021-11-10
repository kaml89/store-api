import { validationResult } from "express-validator";
import User from "../users/user.model";
import { Request, Response, NextFunction } from "express";

const registrationSchema = {
  name: {
    custom: {
      options: (value) => {
        return User.find({ name: value }).then((user) => {
          if (user.length > 0) {
            return Promise.reject("Username already in use");
          }
        });
      },
    },
  },
  email: {
    custom: {
      options: (value) => {
        return User.find({ email: value }).then((email) => {
          if (email.length > 0) {
            return Promise.reject("User with this email already exist");
          }
        });
      },
    },
  },
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "Password should be at least 7 characters long",
    },
  },
};

const validate = (validations) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array(),
    });
  };
};

export { registrationSchema, validate };
