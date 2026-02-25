import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const products = sqliteTable("products", {
  id: integer().primaryKey(),
  name: text().notNull(),
  price: real().notNull(),
});

export const ProductModel = createSelectSchema(products);
export const InsertProductModel = createInsertSchema(products).omit({
  id: true,
});
export const UpdateProductModel = createUpdateSchema(products);

export type Product = z.infer<typeof ProductModel>;
export type InsertProduct = z.infer<typeof InsertProductModel>;
export type UpdateProduct = z.infer<typeof UpdateProductModel>;
