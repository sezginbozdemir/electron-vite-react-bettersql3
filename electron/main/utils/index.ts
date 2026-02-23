import { app } from "electron";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { existsSync, mkdirSync } from "fs";

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

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const generateDirPath = (dirString: string) => {
  try {
    const dir = dirname(dirString);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    log.error("Database connection error:", error);
    throw error;
  }
};
