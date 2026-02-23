import { ipcRenderer } from "electron";
import { UPDATE_CHANNEL } from "../../main/utils/constants";
export const update = {
  onUpdateMsg: (callback: any) => {
    ipcRenderer.send(UPDATE_CHANNEL.MSG);
    ipcRenderer.on(UPDATE_CHANNEL.MSG, (_, response) => callback(response));
  },
  setUrl: async (url: string) =>
    await ipcRenderer.invoke(UPDATE_CHANNEL.SET_URL, url),
  checkUpdate: () => ipcRenderer.send(UPDATE_CHANNEL.CHECK_UPDATE),
  startDownload: () => ipcRenderer.send(UPDATE_CHANNEL.DOWNLOAD_UPDATE),
  quitAndInstall: () => ipcRenderer.send(UPDATE_CHANNEL.EXIT_AND_INSTALL),
};
