import { ProductService } from "../services/product.service";
import { ipcMain } from "electron";
import log from "../../logger";
import type { QueryResponse } from "../../../../global.d";
import { response, toErrorResponse } from "../../utils/response";
ipcMain.handle("db/product/getOne", (_event, { id }): QueryResponse => {
  try {
    return response.ok({ data: ProductService.getOne(id) });
  } catch (err: unknown) {
    log.warn("[PRODUCT HANDLER] product/getOne failed", { id, err });
    return toErrorResponse(err);
  }
});
ipcMain.handle("db/product/getAll", (_event, _arg): QueryResponse => {
  try {
    return response.ok({ data: ProductService.getAll() });
  } catch (err: unknown) {
    log.error("[PRODUCT HANDLER] product/getAll failed", err);
    return toErrorResponse(err);
  }
});

ipcMain.handle("db/product/delete", (_event, { id }): QueryResponse => {
  try {
    ProductService.delete(id);
    return response.ok();
  } catch (err: unknown) {
    log.error("[PRODUCT HANDLER] product/delete failed", { id, err });
    return toErrorResponse(err);
  }
});

ipcMain.handle("db/product/add", (_event, data): QueryResponse => {
  try {
    ProductService.insert(data);
    return response.ok();
  } catch (err: unknown) {
    log.error("[PRODUCT HANDLER] product/insert failed", { data, err });
    return toErrorResponse(err);
  }
});

ipcMain.handle("db/product/update", (_event, arg): QueryResponse => {
  try {
    ProductService.update(arg.id, arg.data);
    return response.ok();
  } catch (err: unknown) {
    log.error("[PRODUCT HANDLER] product/update failed", { arg, err });
    return toErrorResponse(err);
  }
});
