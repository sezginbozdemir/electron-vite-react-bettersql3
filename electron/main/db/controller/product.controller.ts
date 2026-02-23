import { ProductService } from "../services/product.service";
import { ipcMain } from "electron";

ipcMain.handle("db/product/getOne", async (_event, { id }) => {
  return await ProductService.getOne(id);
});

ipcMain.handle("db/product/delete", async (_event, { id }) => {
  return await ProductService.delete(id);
});

ipcMain.handle("db/product/add", async (_event, arg) => {
  return await ProductService.insert(arg.data);
});

ipcMain.handle("db/product/update", async (_event, arg) => {
  return await ProductService.update(arg.id, arg.data);
});
