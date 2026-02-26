import {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} from "@/lib/api/product";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function HomePage() {
  const [id, setId] = useState("1");
  const [name, setName] = useState("Test product");
  const [price, setPrice] = useState("9.99");
  const [result, setResult] = useState<any>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<any>) => {
    setStatus("loading");
    setError(null);
    try {
      const r = await fn();
      setResult(r);
      setStatus("success");
    } catch (e: any) {
      setError(e?.message ?? String(e));
      setStatus("error");
    }
  };

  const fields = [
    { label: "ID", value: id, set: setId },
    { label: "Name", value: name, set: setName },
    { label: "Price", value: price, set: setPrice },
  ];

  const dotColor: Record<Status, string> = {
    idle: "bg-neutral-600",
    loading: "bg-amber-400",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-200 font-mono text-sm p-6">
      <div className="max-w-md grid gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
            dev
          </span>
          <h1 className="text-base font-medium tracking-wide text-white">
            Products
          </h1>
        </div>

        {/* Fields */}
        <div className="grid gap-3">
          {fields.map(({ label, value, set }) => (
            <label key={label} className="grid gap-1.5">
              <span className="text-[11px] uppercase tracking-widest text-neutral-500">
                {label}
              </span>
              <input
                value={value}
                onChange={(e) => set(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 font-mono outline-none focus:border-neutral-600 transition-colors w-full"
              />
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Btn onClick={() => run(() => getProduct(Number(id)))}>Get</Btn>
          <Btn
            onClick={() =>
              run(() => addProduct({ name, price: Number(price) }))
            }
          >
            Add
          </Btn>
          <Btn
            onClick={() =>
              run(() =>
                updateProduct(Number(id), { name, price: Number(price) }),
              )
            }
          >
            Update
          </Btn>
          <Btn danger onClick={() => run(() => deleteProduct(Number(id)))}>
            Delete
          </Btn>
        </div>

        {/* Output */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800">
            <span className="text-[11px] uppercase tracking-widest text-neutral-500">
              Result
            </span>
            <span
              className={`w-2 h-2 rounded-full ${dotColor[status]}`}
              title={status}
            />
          </div>
          <pre className="p-3 text-xs text-neutral-400 whitespace-pre-wrap break-all min-h-[80px]">
            {status === "error"
              ? error
              : result
                ? JSON.stringify(result, null, 2)
                : "—"}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Btn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-neutral-900 border rounded-md px-3 py-1.5 text-xs font-mono tracking-wide cursor-pointer transition-colors
        ${
          danger
            ? "border-red-900 text-red-500 hover:bg-red-950"
            : "border-neutral-800 text-neutral-300 hover:bg-neutral-800"
        }`}
    >
      {children}
    </button>
  );
}
