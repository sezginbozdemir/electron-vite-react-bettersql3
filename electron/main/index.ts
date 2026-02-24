import { BrowserWindow, app } from "electron";
import log from "./logger";
import { dbInit } from "./db-init";
import { addTray, createWindow } from "./window/create-window";
import { loadEnv } from "../env";
loadEnv();

app.whenReady().then(async () => {
  log.info("main init");
  await dbInit();
  createWindow();
  addTray();
  app.on("activate", () => {
    // macOS: recreate a window when clicking dock icon and none exist
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
