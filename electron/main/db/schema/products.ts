import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer().primaryKey(),
  name: text(),
  price: integer(),
});
