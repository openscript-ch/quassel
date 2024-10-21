import { AppShell, Brand, Button, IconLogout, Group, Text } from "@quassel/ui";
import { createRootRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { version } from "../../package.json";
import { $session } from "../stores/session";
import { useStore } from "@nanostores/react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const n = useNavigate();
  const sessionStore = useStore($session);
  const handleSignOut = () => {
    $session.set({});
    n({ to: "/session" });
  };

  return (
    <>
      <AppShell header={{ height: 118 }} footer={{ height: 156 }}>
        <AppShell.Header>
          <Group justify="space-between">
            <Link to="/">
              <Brand />
            </Link>
            {sessionStore.token && (
              <Group>
                <Text>{sessionStore.email}</Text>
                <Button leftSection={<IconLogout />} onClick={handleSignOut}>
                  Sign out
                </Button>
              </Group>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <div id="stage">
            <Outlet />
          </div>
        </AppShell.Main>
        <AppShell.Footer>Version {version}</AppShell.Footer>
      </AppShell>
      <TanStackRouterDevtools position="top-left" />
    </>
  );
}
