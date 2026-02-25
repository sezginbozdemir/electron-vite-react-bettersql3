import { ProductService } from "../services/product.service";
import { ipcMain } from "electron";

ipcMain.handle("db/product/getOne", (_event, { id }) => {
  return ProductService.getOne(id);
});
ipcMain.handle("db/product/getAll", (_event, _arg) => {
  return ProductService.getAll();
});

ipcMain.handle("db/product/delete", (_event, { id }) => {
  return ProductService.delete(id);
});

ipcMain.handle("db/product/add", (_event, data) => {
  return ProductService.insert(data);
});

ipcMain.handle("db/product/update", (_event, arg) => {
  return ProductService.update(arg.id, arg.data);
});
