import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

const links = [
  { to: "/", label: "Dashboard", exact: true },
  { to: "/products", label: "Products" },
  { to: "/fs", label: "FS Test" },
  { to: "/about", label: "About" },
];

function RootComponent() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-neutral-300 font-mono overflow-hidden">
      {/* Sidebar */}
      <aside className="w-48 shrink-0 border-r border-neutral-800 flex flex-col py-6 px-4 gap-1">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-5 h-5 rounded bg-white" />
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            Testlab
          </span>
        </div>

        {/* Nav */}
        {links.map(({ to, label, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={exact ? { exact: true } : undefined}
            className="text-xs tracking-wide px-2 py-2 rounded-md text-neutral-500 hover:text-neutral-200 hover:bg-neutral-900 transition-colors"
            activeProps={{
              className:
                "text-xs tracking-wide px-2 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-900",
            }}
          >
            {label}
          </Link>
        ))}

        {/* Bottom */}
        <div className="mt-auto px-2">
          <div className="text-[10px] text-neutral-700 uppercase tracking-widest">
            v0.0.1 · dev
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>

      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
