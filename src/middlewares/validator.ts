import { createModule } from "create-nestjs-middleware-module";
import { Options, createValidationMiddleware } from "../util/ajv.validator";

export const ValidationModule = createModule<Options>(createValidationMiddleware);
