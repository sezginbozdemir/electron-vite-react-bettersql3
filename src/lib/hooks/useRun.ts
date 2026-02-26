import { useState } from "react";
import { type Status } from "@/lib/types";

export function useRun() {
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

  return { run, result, status, error };
}
