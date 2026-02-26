export function AboutPage() {
  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
          dev
        </span>
        <h1 className="text-white text-sm font-semibold tracking-widest uppercase">
          About
        </h1>
      </div>

      <p className="text-xs text-neutral-500 leading-relaxed">
        A minimal desktop app boilerplate built with{" "}
        <span className="text-neutral-300">Electron</span>,{" "}
        <span className="text-neutral-300">Vite</span>,{" "}
        <span className="text-neutral-300">React</span>,{" "}
        <span className="text-neutral-300">better-sqlite3</span>,{" "}
        <span className="text-neutral-300">Drizzle ORM</span>, and{" "}
        <span className="text-neutral-300">Zod</span>.
      </p>

      <a
        href="https://github.com/sezginbozdemir/electron-vite-react-bettersql3"
        target="_blank"
        rel="noreferrer"
        className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-neutral-200 transition-colors w-fit border-b border-neutral-800 hover:border-neutral-500 pb-0.5"
      >
        github.com/sezginbozdemir/electron-vite-react-bettersql3 →
      </a>
    </div>
  );
}
