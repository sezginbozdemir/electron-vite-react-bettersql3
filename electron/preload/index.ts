import { query } from "./modules/db";
import { update } from "./modules/update";
import { logger } from "./modules/logger";
import { contextBridge } from "electron";
import { createWindow } from "./modules/window-pool";
import { fsService } from "./modules/fs";
contextBridge.exposeInMainWorld("api", {
  db: query,
  fs: fsService,
  update,
  logger,
  createWindow,
});
