import {
  AppShell,
  Brand,
  Button,
  IconLogout,
  Group,
  Text,
  NavLink,
  IconUsers,
  IconDashboard,
  IconDatabaseExport,
  IconLanguage,
  IconFriends,
  IconLego,
  IconCalendarWeek,
  IconMapSearch,
  Divider,
} from "@quassel/ui";
import { createRootRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { version } from "../../package.json";
import { $session } from "../stores/session";
import { useStore } from "@nanostores/react";
import { $layout } from "../stores/layout";
import { $api } from "../stores/api";

function Root() {
  const n = useNavigate();
  const sessionStore = useStore($session);
  const layoutStore = useStore($layout);
  const signOut = () => {
    $session.set({});
    n({ to: "/session" });
  };
  const signOutMutation = $api.useMutation("delete", "/session", { onSettled: () => signOut() });
  const handleSignOut = () => {
    signOutMutation.mutate({});
  };

  return (
    <>
      <AppShell
        header={{ height: 118 }}
        footer={{ height: 156 }}
        navbar={{ width: 300, breakpoint: 1000, collapsed: { desktop: !layoutStore.admin } }}
      >
        <AppShell.Header>
          <Group justify="space-between">
            <Link to="/">
              <Brand />
            </Link>
            {sessionStore.email && (
              <Group>
                <Text>{sessionStore.email}</Text>
                <Button leftSection={<IconLogout />} onClick={handleSignOut}>
                  Sign out
                </Button>
              </Group>
            )}
          </Group>
        </AppShell.Header>
        {layoutStore.admin && (
          <AppShell.Navbar>
            <NavLink component={Link} to="/administration/" activeOptions={{ exact: true }} leftSection={<IconDashboard />} label="Dashboard" />
            <Divider label="Research" />
            <NavLink component={Link} to="/administration/participants" leftSection={<IconLego />} label="Participants" />
            <NavLink component={Link} to="/administration/questionnaires" leftSection={<IconCalendarWeek />} label="Questionnaires" />
            <NavLink component={Link} to="/administration/studies" leftSection={<IconMapSearch />} label="Studies" />
            <Divider label="Defaults" />
            <NavLink component={Link} to="/administration/languages" leftSection={<IconLanguage />} label="Languages" />
            <NavLink component={Link} to="/administration/carers" leftSection={<IconFriends />} label="Carers" />
            <Divider label="System" />
            <NavLink
              component={Link}
              to="/administration/export"
              activeOptions={{ exact: true }}
              leftSection={<IconDatabaseExport />}
              label="Export"
            />
            <NavLink component={Link} to="/administration/users" leftSection={<IconUsers />} label="Users" />
          </AppShell.Navbar>
        )}
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

export const Route = createRootRoute({
  component: Root,
});
