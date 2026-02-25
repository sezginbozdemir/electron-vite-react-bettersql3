import { createFileRoute } from "@tanstack/react-router";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/lib/api/product";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const api = (window as any).api;

  const [id, setId] = useState("1");
  const [name, setName] = useState("Test product");
  const [price, setPrice] = useState("9.99");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<any>) => {
    setError(null);
    try {
      const r = await fn();
      setResult(r);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    }
  };

  return (
    <div style={{ padding: 16, display: "grid", gap: 12, maxWidth: 520 }}>
      <h3>Products test</h3>
      <h3>API: {api ? "present" : "missing"}</h3>
      <pre>{JSON.stringify(Object.keys(api ?? {}), null, 2)}</pre>
      <pre>{JSON.stringify(api ?? null, null, 2)}</pre>{" "}
      {/* may throw if api has functions */}
      <label>
        id
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        price
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%" }}
        />
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => run(() => getProduct(id))}>Get</button>

        <button
          onClick={() =>
            run(() =>
              addProduct({
                name,
                price: Number(price),
              }),
            )
          }
        >
          Add
        </button>

        <button
          onClick={() =>
            run(() => updateProduct(id, { name, price: Number(price) }))
          }
        >
          Update
        </button>

        <button onClick={() => run(() => deleteProduct(id))}>Delete</button>
      </div>
      {error && (
        <pre
          style={{ background: "#fee", padding: 12, whiteSpace: "pre-wrap" }}
        >
          {error}
        </pre>
      )}
      <pre
        style={{ background: "#f6f6f6", padding: 12, whiteSpace: "pre-wrap" }}
      >
        {result ? JSON.stringify(result, null, 2) : "No result yet"}
      </pre>
    </div>
  );
}
