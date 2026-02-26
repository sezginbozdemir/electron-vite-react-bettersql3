import { eq } from "drizzle-orm";
import { db } from "../db-connect";
import { products } from "../schema";
import {
  InsertProductModel,
  UpdateProductModel,
  type Product,
} from "../schema/products";
import { ValidationError, NotFoundError } from "../../utils/errors";

export class ProductService {
  static getAll(): Product[] {
    const result = db.select().from(products).all();
    return result;
  }

  static getOne(id: number): Product | null {
    const result = db.select().from(products).where(eq(products.id, id)).get();
    if (!result) throw new NotFoundError("product not found");

    return result;
  }

  static delete(id: number) {
    return db.transaction((tx) => {
      const result = tx.delete(products).where(eq(products.id, id)).run();
      if (result.changes === 0) {
        tx.rollback();
        throw new NotFoundError("product not found");
      }
    });
  }

  static update(id: number, data: unknown) {
    const parsed = UpdateProductModel.safeParse(data);
    if (!parsed.success) throw new ValidationError(parsed.error);

    return db.transaction((tx) => {
      const result = tx
        .update(products)
        .set(parsed.data)
        .where(eq(products.id, id))
        .run();
      if (result.changes === 0) {
        tx.rollback();
        throw new Error("update failed");
      }
    });
  }

  static insert(data: unknown) {
    const parsed = InsertProductModel.safeParse(data);
    if (!parsed.success) throw new ValidationError(parsed.error);

    return db.transaction((tx) => {
      const result = tx.insert(products).values(parsed.data).run();
      if (result.changes === 0) {
        tx.rollback();
        throw new Error("insert failed");
      }
    });
  }
}
