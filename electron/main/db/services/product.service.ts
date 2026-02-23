import { eq } from "drizzle-orm";
import { db } from "../db-connect";
import { products } from "../schema";
import { response } from "../../utils/response";
export class ProductService {
  static async getOne(id: number) {
    const res = await db.select().from(products).where(eq(products.id, id));

    if (!res) {
      return response.error({ message: "product not found" });
    }
    return response.ok({ data: res?.[0] });
  }
  static async delete(id: number) {
    return await db.transaction(async (tx) => {
      const product = await tx.delete(products).where(eq(products.id, id));
      if (!product) {
        tx.rollback();
        response.error({ message: "product not found" });
      }

      return response.ok();
    });
  }

  static async update(id: number, data: any) {
    return await db.transaction(async (tx) => {
      const product = await tx
        .update(products)
        .set(data)
        .where(eq(products.id, id));
      if (!product) {
        tx.rollback();
        return response.error();
      }
      return response.ok();
    });
  }
  static async insert(data: any) {
    return await db.transaction(async (tx) => {
      const product = await tx.insert(products).values(data);
      if (!product) {
        tx.rollback();
        return response.error();
      }
      return response.ok();
    });
  }
}
