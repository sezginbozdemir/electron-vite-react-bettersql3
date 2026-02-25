import { eq } from "drizzle-orm";
import { db } from "../db-connect";
import { products } from "../schema";
import { response } from "../../utils/response";
export class ProductService {
  static getAll() {
    const res = db.select().from(products).all();
    if (!res) {
      return response.error({ message: "error listing all products" });
    }
    return response.ok({ data: res });
  }
  static getOne(id: number) {
    const res = db.select().from(products).where(eq(products.id, id)).all();

    if (!res) {
      return response.error({ message: "product not found" });
    }
    return response.ok({ data: res });
  }
  static delete(id: number) {
    return db.transaction((tx) => {
      const product = tx.delete(products).where(eq(products.id, id)).run();
      if (!product) {
        tx.rollback();
        response.error({ message: "product not found" });
      }

      return response.ok();
    });
  }

  static update(id: number, data: any) {
    return db.transaction((tx) => {
      const product = tx
        .update(products)
        .set(data)
        .where(eq(products.id, id))
        .run();
      if (!product) {
        tx.rollback();
        return response.error();
      }
      return response.ok();
    });
  }
  static insert(data: any) {
    return db.transaction((tx) => {
      const product = tx.insert(products).values(data).run();
      if (!product) {
        tx.rollback();
        return response.error();
      }
      return response.ok();
    });
  }
}
