import type { QueryResponse } from "../../../global";
import log from "../logger";
import { DatabaseError, NotFoundError, ValidationError } from "./errors";
import { DrizzleQueryError } from "drizzle-orm";
export const response = {
  ok: <T = any>(payload?: {
    code?: number;
    message?: string;
    data?: T;
  }): QueryResponse<T> => {
    const res = {
      code: 200,
      message: "success",
      data: null as any,
      ...payload,
    };
    log.info(`response ok | code: ${res.code} | msg: ${res.message}`);
    return res;
  },
  error: <T = any>(payload?: {
    code?: number;
    message?: string;
    data?: T;
  }): QueryResponse<T> => {
    const { data, ...rest } = payload ?? {};
    const res = {
      code: 500,
      message: "failure",
      data: null,
      ...rest,
    };
    log.error(
      `response error | code: ${res.code} | msg: ${res.message}`,
      data ?? {},
    );
    return res;
  },
};

export const toErrorResponse = (err: unknown): QueryResponse => {
  if (err instanceof NotFoundError) {
    return response.error({ code: err.code, message: err.message });
  }
  if (err instanceof ValidationError) {
    return response.error({ code: err.code, message: err.message });
  }
  if (err instanceof DrizzleQueryError) {
    const dbErr = new DatabaseError(err);
    return response.error({
      code: dbErr.code,
      message: "internal error",
      data: dbErr,
    });
  }

  if (err instanceof Error) {
    return response.error({ code: 500, message: "internal error" });
  }
  return response.error({ code: 500, message: `Unknown err` });
};
