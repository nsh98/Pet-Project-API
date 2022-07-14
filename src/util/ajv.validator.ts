import { Request, Response, NextFunction } from "express";
import { JTDDataType } from "ajv/dist/jtd";

export interface Options {
  validator: any;
}

export function createValidationMiddleware(options: Options) {
  return (request: Request, response: Response, next: NextFunction) => {
    const valid = options.validator(request.body);
    if (!valid) {
      const errors = options.validator.errors;
      const payload = [];
      const message = "validation error";
      errors.forEach((error: any) => {
        payload.push({
          dataPath: error.instancePath,
          error: error.message,
        });
      });
      return response.status(400).json({ message, payload });
    }
    next();
  };
}
