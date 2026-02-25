import { getAllProducts, deleteProduct } from "@/lib/api/product";
import { useEffect, useState } from "react";
import { type Product } from "global";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await getAllProducts();
    setProducts((res?.data as Product[]) ?? []);
    setLoading(false);
  }
  async function remove(id: number) {
    await deleteProduct(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-sm font-medium tracking-wide">
          Products
        </h1>
        <button
          onClick={load}
          className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_120px_80px] px-4 py-2 border-b border-neutral-800">
          <span className="text-[10px] uppercase tracking-widest text-neutral-600">
            ID
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-600">
            Name
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-600">
            Price
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-600"></span>
        </div>

        {loading && (
          <div className="py-10 text-center text-xs text-neutral-600">
            Loading...
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="py-10 text-center text-xs text-neutral-600">
            No products
          </div>
        )}

        {!loading &&
          products.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[60px_1fr_120px_80px] px-4 py-3 border-b border-neutral-800/40 last:border-0 hover:bg-neutral-900/40 transition-colors items-center"
            >
              <span className="text-neutral-600 text-xs">{p.id}</span>
              <span className="text-neutral-200 text-xs">{p.name}</span>
              <span className="text-neutral-400 text-xs">${p.price}</span>
              <button
                onClick={() => remove(p.id)}
                className="text-xs text-red-500/50 hover:text-red-500 transition-colors text-left"
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {!loading && (
        <p className="mt-3 text-[11px] text-neutral-700">
          {products.length} products
        </p>
      )}
    </div>
  );
}
