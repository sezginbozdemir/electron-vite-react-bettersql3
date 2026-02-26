import { useState } from "react";

export function FsPage() {
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");
  const [output, setOutput] = useState<unknown>(null);

  const run = async (action: () => Promise<unknown>) => {
    const result = await action();
    setOutput(result);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-white text-sm font-semibold tracking-widest uppercase">
        FS Test
      </h1>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-neutral-500">
          Path
        </label>
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/some/path/file.txt"
          className="bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 outline-none focus:border-neutral-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-neutral-500">
          Content (for write)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 outline-none focus:border-neutral-600 resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: "Read", action: () => window.api.fs.read(path) },
          { label: "Write", action: () => window.api.fs.write(path, content) },
          { label: "ReadDir", action: () => window.api.fs.readDir(path) },
          { label: "MakeDir", action: () => window.api.fs.makeDir(path) },
          { label: "Remove", action: () => window.api.fs.remove(path) },
          { label: "Exists", action: () => window.api.fs.exists(path) },
          { label: "Stat", action: () => window.api.fs.stat(path) },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={() => run(action)}
            className="text-xs px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      {output !== null && (
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-neutral-500">
            Output
          </label>
          <pre className="bg-neutral-900 border border-neutral-800 rounded p-4 text-xs text-neutral-300 overflow-auto whitespace-pre-wrap">
            {JSON.stringify(output, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
