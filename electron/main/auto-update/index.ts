import { ipcMain } from "electron";
import updater from "electron-updater";
import { UPDATE_CHANNEL, UPDATE_CODE } from "../utils/constants";
import { WebContents } from "electron";

const { autoUpdater } = updater;

autoUpdater.forceDevUpdateConfig = false;
autoUpdater.autoDownload = false;

let wc: WebContents;

ipcMain.on(UPDATE_CHANNEL.MSG, async (event, _message) => {
  wc = event.sender;
});
ipcMain.handle(UPDATE_CHANNEL.SET_URL, (_e, url) =>
  autoUpdater.setFeedURL(url),
);

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
