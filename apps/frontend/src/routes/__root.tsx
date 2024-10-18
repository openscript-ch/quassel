import { AppShell, Brand } from "@quassel/ui";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppShell header={{ height: 118 }}>
        <AppShell.Header>
          <Link to="/">
            <Brand />
          </Link>
        </AppShell.Header>
        <AppShell.Main>
          <div id="stage">
            <Outlet />
          </div>
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools />
    </>
  ),
});
