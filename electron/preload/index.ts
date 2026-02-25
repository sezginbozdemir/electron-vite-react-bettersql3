import { query } from "./modules/db";
import { update } from "./modules/update";
import { logger } from "./modules/logger";
import { contextBridge } from "electron";
import { createWindow } from "./modules/window-pool";
import { fsService } from "./modules/fs";
import { loadEnv } from "../env";
loadEnv();
console.log("exposing api");
contextBridge.exposeInMainWorld("api", {
  db: query,
  fs: fsService,
  env: process.env.NODE_ENV,
  update,
  logger,
  createWindow,
});
