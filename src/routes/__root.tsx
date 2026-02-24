import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <nav>
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>

        <Link to="/about">About</Link>
      </nav>

      <hr />

      <main style={{ padding: 12 }}>
        <Outlet />
      </main>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
