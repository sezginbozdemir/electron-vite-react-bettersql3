import { BrowserWindow, app } from "electron";
import log from "./logger";
import { addTray, createWindow } from "./window/create-window";
import { loadEnv } from "../main/utils";
import "./db/handlers/index";
import "./fs/handlers/index";
import { dbConnect } from "./db/db-connect";
loadEnv();

app.whenReady().then(async () => {
  log.info("main init");
  await dbConnect();
  createWindow();
  addTray();
  app.on("activate", () => {
    // macOS: recreate a window when clicking dock icon and none exist
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

process.on("uncaughtException", (err) => {
  log.error("[MAIN] uncaughtException:", err);
});

process.on("unhandledRejection", (err) => {
  log.error("[MAIN] unhandledRejection:", err);
});
app.on("render-process-gone", (_event, _webContents, details) => {
  log.error("[MAIN] renderer-process-gone:", details);
});
app.on("child-process-gone", (_event, details) => {
  log.error("[MAIN] child-process-gone:", details);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
