import { DrizzleQueryError } from "drizzle-orm";
import { ZodError } from "zod";
export class DatabaseError extends Error {
  name = "DatabaseError";
  code = 500;
  query?: string;
  params?: unknown[];

  constructor(err: DrizzleQueryError) {
    super(err.message, { cause: err.cause });
    this.query = err.query;
    this.params = err.params;
    if (Error.captureStackTrace) Error.captureStackTrace(this, DatabaseError);
  }
}
export class NotFoundError extends Error {
  code = 404;

  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
export class ValidationError extends Error {
  code = 400;

  constructor(err: ZodError) {
    super(err.message, { cause: err.cause });
    this.name = "ValidationError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}
