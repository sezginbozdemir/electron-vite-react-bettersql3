import { ipcRenderer } from "electron";
export const createWindow = async (): Promise<string> => {
  return ipcRenderer.invoke("open-window");
};
