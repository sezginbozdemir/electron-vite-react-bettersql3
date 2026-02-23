import { ipcRenderer } from "electron";

const sendLog = (level: string, message: unknown) =>
  ipcRenderer.send("__ELECTRON_LOG__", {
    data: [message],
    level,
    variables: { processType: "renderer" },
  });

export const logger = {
  error: (msg: any) => sendLog("error", msg),
  warn: (msg: any) => sendLog("warn", msg),
  info: (msg: any) => sendLog("info", msg),
  verbose: (msg: any) => sendLog("verbose", msg),
  debug: (msg: any) => sendLog("debug", msg),
  silly: (msg: any) => sendLog("silly", msg),
};
