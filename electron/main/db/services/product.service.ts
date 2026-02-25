import { eq } from "drizzle-orm";
import { db } from "../db-connect";
import { products } from "../schema";
import { response } from "../../utils/response";
import type { QueryResponse } from "../../../../global";
import {
  InsertProductModel,
  UpdateProductModel,
  type Product,
} from "../schema/products";
export class ProductService {
  static getAll(): QueryResponse<Product[]> {
    const result = db.select().from(products).all();
    return response.ok({ data: result });
  }

  static getOne(id: number): QueryResponse<Product> {
    const result = db.select().from(products).where(eq(products.id, id)).get();

    if (!result) {
      return response.error({ message: "product not found" });
    }
    return response.ok({ data: result });
  }

  static delete(id: number): QueryResponse<null> {
    return db.transaction((tx) => {
      const result = tx.delete(products).where(eq(products.id, id)).run();
      if (result.changes === 0) {
        tx.rollback();
        return response.error({ message: "product not found" });
      }

      return response.ok();
    });
  }

  static update(id: number, data: unknown): QueryResponse<null> {
    const parsed = UpdateProductModel.safeParse(data);
    if (!parsed.success) {
      return response.error({ message: parsed.error.message });
    }

    return db.transaction((tx) => {
      const result = tx
        .update(products)
        .set(parsed.data)
        .where(eq(products.id, id))
        .run();
      if (result.changes === 0) {
        tx.rollback();
        return response.error({ message: "update failed" });
      }
      return response.ok();
    });
  }

  static insert(data: unknown): QueryResponse<null> {
    const parsed = InsertProductModel.safeParse(data);
    if (!parsed.success) {
      return response.error({ message: parsed.error.message });
    }
    return db.transaction((tx) => {
      const result = tx.insert(products).values(parsed.data).run();
      if (result.changes === 0) {
        tx.rollback();
        return response.error();
      }
      return response.ok();
    });
  }
}
