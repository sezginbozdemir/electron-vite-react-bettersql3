import log from "../logger";
export const response = {
  ok: (data?: { code?: number; message?: string; data?: unknown }) => {
    const res = {
      code: 200,
      message: "success",
      data: null,
      ...data,
    };
    log.info(`response ok | code: ${res.code} | msg: ${res.message}`);
    return res;
  },

  error: (data?: { code?: number; message?: string; data?: unknown }) => {
    const res = {
      code: 500,
      message: "failure",
      ...data,
    };
    log.error(`response error | code: ${res.code} | msg: ${res.message}`);
    return res;
  },
};
