import type { InsertProduct, Product, UpdateProduct } from "../../../global.d";

export const getProduct = async (id: number) => {
  return window.api.db<Product>({
    path: "db/product/getOne",
    params: { id },
  });
};
export const getAllProducts = async () => {
  return window.api.db<Product[]>({
    path: "db/product/getAll",
    params: {},
  });
};

export const deleteProduct = async (id: number) => {
  return window.api.db({
    path: "db/product/delete",
    params: { id },
  });
};

export const addProduct = async (data: InsertProduct) => {
  return window.api.db({
    path: "db/product/add",
    params: data,
  });
};

export const updateProduct = async (id: number, data: UpdateProduct) => {
  return window.api.db({
    path: "db/product/update",
    params: { id, data },
  });
};
