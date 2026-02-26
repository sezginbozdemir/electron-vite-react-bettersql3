import { ipcMain } from "electron";
import { FsService } from "../services/fs.service";
import { response } from "../../utils/response";

ipcMain.handle("fs/read", async (_event, { path }) => {
  try {
    const data = await FsService.read(path);
    return response.ok({ data });
  } catch (error) {
    return response.error({
      message: "Failed to read file",
      data: { path, error },
    });
  }
});

ipcMain.handle("fs/write", async (_event, { path, content }) => {
  try {
    await FsService.write(path, content);
    return response.ok();
  } catch (error) {
    return response.error({
      message: "Failed to write file",
      data: { path, error },
    });
  }
});

ipcMain.handle("fs/readDir", async (_event, { path }) => {
  try {
    const data = await FsService.readDir(path);
    return response.ok({ data });
  } catch (error) {
    return response.error({
      message: "Failed to read directory",
      data: { path, error },
    });
  }
});

ipcMain.handle("fs/makeDir", async (_event, { path }) => {
  try {
    await FsService.makeDir(path);
    return response.ok();
  } catch (error) {
    return response.error({
      message: "Failed to create directory",
      data: { path, error },
    });
  }
});

ipcMain.handle("fs/remove", async (_event, { path }) => {
  try {
    await FsService.remove(path);
    return response.ok();
  } catch (error) {
    return response.error({
      message: "Failed to remove path",
      data: { path, error },
    });
  }
});

ipcMain.handle("fs/rename", async (_event, { oldPath, newPath }) => {
  try {
    await FsService.rename(oldPath, newPath);
    return response.ok();
  } catch (error) {
    return response.error({
      message: "Failed to rename path",
      data: { oldPath, newPath, error },
    });
  }
});

ipcMain.handle("fs/copy", async (_event, { src, dest }) => {
  try {
    await FsService.copy(src, dest);
    return response.ok();
  } catch (error) {
    return response.error({
      message: "Failed to copy file",
      data: { src, dest, error },
    });
  }
});

ipcMain.handle("fs/exists", async (_event, { path }) => {
  try {
    const data = await FsService.exists(path);
    return response.ok({ data });
  } catch (error) {
    return response.error({
      message: "Failed to check path existence",
      data: { path, error },
    });
  }
});

ipcMain.handle("fs/stat", async (_event, { path }) => {
  try {
    const data = await FsService.stat(path);
    return response.ok({ data });
  } catch (error) {
    return response.error({
      message: "Failed to get path stats",
      data: { path, error },
    });
  }
});
