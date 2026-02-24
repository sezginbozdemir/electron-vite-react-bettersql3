import log from "../logger";
import type { QueryResponse } from "../../../global.d";

export const response = {
  ok: <T = null>(payload?: { code?: number; message?: string; data?: T }) => {
    const res: QueryResponse = {
      code: 200,
      message: "success",
      data: null as any,
      ...payload,
    };
    log.info(`response ok | code: ${res.code} | msg: ${res.message}`);
    return res;
  },

  error: <T = null>(payload?: {
    code?: number;
    message?: string;
    data?: T;
  }) => {
    const res: QueryResponse = {
      code: 500,
      message: "failure",
      data: null as any,
      ...payload,
    };
    log.error(`response error | code: ${res.code} | msg: ${res.message}`);
    return res;
  },
};
