import type { QueryResponse } from "../../../global";
import log from "../logger";
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
    const res = {
      code: 500,
      message: "failure",
      data: null as any,
      ...payload,
    };
    log.error(`response error | code: ${res.code} | msg: ${res.message}`);
    return res;
  },
};
