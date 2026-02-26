import { app } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs";
import log from "../logger";
import { config } from "dotenv";
import { APP_NAME, DB_CONFIG } from "./constants";

export const isProd = app.isPackaged;

export const findRoot = (): string => {
  let dir = path.resolve(process.cwd());
  while (true) {
    if (existsSync(path.join(dir, "package.json"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error("Could not find project root");
    dir = parent;
  }
};

export const loadEnv = (): void => {
  const envPath = isProd
    ? path.join(process.resourcesPath, ".env")
    : path.join(findRoot(), ".env");
  if (!existsSync(envPath)) {
    const msg = "Missing env file";
    log.error(msg);
    throw new Error(msg);
  }

  config({ path: envPath });
};

export const getAppHand = () => {
  return app.getPath("appData");
};

export const getUserDataPath = () => {
  return app.getPath("userData");
};

export const getResourcePath = () => {
  return process.resourcesPath;
};

export const isMac = () => {
  return process.platform === "darwin";
};

export const getDirname = (importMetaUrl: string) => {
  return path.dirname(fileURLToPath(importMetaUrl));
};

export const getDbPath = () =>
  isProd
    ? path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName)
    : path.join(findRoot(), "./__database/", DB_CONFIG.dbFileName);
