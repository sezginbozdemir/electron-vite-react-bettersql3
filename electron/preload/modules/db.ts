import { DB_CONFIG } from "../../main/utils/constants";
import { ipcRenderer } from "electron";
import type { QueryOptions } from "../../../global.d";
import log from "../../main/logger";

export const query = (options: QueryOptions) => {
  const { path, params, timeout = DB_CONFIG.timeout } = options;

  const renderRequest = ipcRenderer.invoke(path, params);

  let timer: any = null;
  const timeoutHand = new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve({ code: 500, message: "request timed out" });
    }, timeout);
  });

  const requestResult = Promise.race([renderRequest, timeoutHand]);

  try {
    const res = requestResult;
    return res;
  } catch (error) {
    log.warn(
      `queryDB failed | channel: ${path} | params: ${JSON.stringify(params)} | error: ${error}`,
    );
  } finally {
    clearTimeout(timer);
  }
};
