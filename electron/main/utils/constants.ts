import pkg from "../../../package.json";
export const APP_NAME = pkg.name;

const DB_NAME =
  process.env.NODE_ENV === "production" ? "autoLite.db" : "autoLite.dev.db";

export const DB_CONFIG = {
  dbFileName: DB_NAME,
  timeout: 30 * 1000,
};
export const UPDATE_CHANNEL = {
  INIT: "update-init",
  SET_URL: "update-set-url",
  CHECK_UPDATE: "update-check-update",
  DOWNLOAD_UPDATE: "update-download-file",
  EXIT_AND_INSTALL: "update-exit-and-install",
  MSG: "update-render-msg",
};

const updateCode = {
  error: -1,
  checking: 0,
  updateAvaible: 1,
  updateNotAvaible: 2,
  downloadProgress: 3,
  updateDownloaded: 4,
} as const;
export type UPDATE_CODE = (typeof updateCode)[keyof typeof updateCode];
