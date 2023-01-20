import { ValidationError } from "express-validator";

import { CustomError } from "./custom_error";

export declare type JoiErrorType = {
  msg: any;
  param: any;
};

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public error: ValidationError[] | JoiErrorType[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.error.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
