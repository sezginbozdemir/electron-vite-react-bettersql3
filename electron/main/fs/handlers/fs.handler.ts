import { ipcMain } from "electron";
import { FsService } from "../services/fs.service";

ipcMain.handle("fs/read", async (_event, { path }) => {
  return await FsService.read(path);
});

ipcMain.handle("fs/write", async (_event, { path, content }) => {
  return await FsService.write(path, content);
});

ipcMain.handle("fs/readDir", async (_event, { path }) => {
  return await FsService.readDir(path);
});

ipcMain.handle("fs/makeDir", async (_event, { path }) => {
  return await FsService.makeDir(path);
});

ipcMain.handle("fs/remove", async (_event, { path }) => {
  return await FsService.remove(path);
});

ipcMain.handle("fs/rename", async (_event, { oldPath, newPath }) => {
  return await FsService.rename(oldPath, newPath);
});

ipcMain.handle("fs/copy", async (_event, { src, dest }) => {
  return await FsService.copy(src, dest);
});

ipcMain.handle("fs/exists", async (_event, { path }) => {
  return await FsService.exists(path);
});

ipcMain.handle("fs/stat", async (_event, { path }) => {
  return await FsService.stat(path);
});
