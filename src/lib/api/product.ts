export const getProduct = async (id: any) => {
  return window.api.db({
    path: "db/product/getOne",
    params: { id },
  });
};
export const deleteProduct = async (id: any) => {
  return window.api.db({
    path: "db/product/delete",
    params: { id },
  });
};

export const addProduct = async (data: any) => {
  return window.api.db({
    path: "db/product/add",
    params: data,
  });
};

export const updateProduct = async (id: any, data: any) => {
  return window.api.db({
    path: "db/product/getOne",
    params: { id, data },
  });
};
