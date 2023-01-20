import { CustomError } from "./custom_error";

export class ForbiddenError extends CustomError {
  statusCode = 403;
  constructor() {
    super("Access Forbidden");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  serializeErrors() {
    return [{ message: "Access Forbidden" }];
  }
}
