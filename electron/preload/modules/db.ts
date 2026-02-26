import { DB_CONFIG } from "../../main/utils/constants";
import { ipcRenderer } from "electron";
import type { QueryOptions } from "../../../global.d";

export const query = (options: QueryOptions) => {
  const { path, params, timeout = DB_CONFIG.timeout } = options;

  const renderRequest = ipcRenderer.invoke(path, params);

  let timer: any = null;
  const timeoutHand = new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve({ code: 500, message: "request timed out" });
    }, timeout);
  });
  clearTimeout(timer);

  return Promise.race([renderRequest, timeoutHand]).finally(() => {
    clearTimeout(timer);
  });
};
