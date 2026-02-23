import { ipcMain } from "electron";
import updater from "electron-updater";
import { UPDATE_CHANNEL, UPDATE_CODE } from "../utils/constants";
import { type WebContents } from "electron";

const { autoUpdater } = updater;

autoUpdater.autoDownload = false;
autoUpdater.forceDevUpdateConfig = false;

let wc: WebContents;

ipcMain.on(UPDATE_CHANNEL.MSG, (event) => {
  wc = event.sender;
});

ipcMain.handle(UPDATE_CHANNEL.SET_URL, (_e, url) =>
  autoUpdater.setFeedURL(url),
);

ipcMain.on(UPDATE_CHANNEL.CHECK_UPDATE, () => {
  autoUpdater.checkForUpdates();
});

ipcMain.on(UPDATE_CHANNEL.DOWNLOAD_UPDATE, () => {
  autoUpdater.downloadUpdate();
});

ipcMain.on(UPDATE_CHANNEL.EXIT_AND_INSTALL, () => {
  autoUpdater.quitAndInstall();
});

const sendStatus = (code: number, data?: any) => {
  wc?.send?.(UPDATE_CHANNEL.MSG, { code, data });
};

autoUpdater.on("error", (err) => sendStatus(UPDATE_CODE.error, err.message));
autoUpdater.on("checking-for-update", () => sendStatus(UPDATE_CODE.checking));
autoUpdater.on("update-available", () => sendStatus(UPDATE_CODE.updateAvaible));
autoUpdater.on("update-not-available", () =>
  sendStatus(UPDATE_CODE.updateNotAvaible),
);
autoUpdater.on("download-progress", (p) =>
  sendStatus(UPDATE_CODE.downloadProgress, p),
);
autoUpdater.on("update-downloaded", () =>
  sendStatus(UPDATE_CODE.updateDownloaded),
);
