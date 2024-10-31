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
import { createRootRouteWithContext, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { version } from "../../package.json";
import { $session } from "../stores/session";
import { useStore } from "@nanostores/react";
import { $layout } from "../stores/layout";
import { $api } from "../stores/api";
import { DefaultError, QueryClient, useQueryClient } from "@tanstack/react-query";

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
  const qc = useQueryClient();
  const handleUnauthorized = (error: DefaultError) => {
    if (error.statusCode === 401) {
      signOut();
    }
  };
  qc.getQueryCache().config.onError = handleUnauthorized;
  qc.getMutationCache().config.onError = handleUnauthorized;

  return (
    <>
      <AppShell
        header={{ height: 118 }}
        footer={{ height: 84 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: !layoutStore.admin } }}
        padding="sm"
        mod={{ admin: layoutStore.admin }}
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
        <AppShell.Main m="lg">
          <Outlet />
        </AppShell.Main>
        <AppShell.Footer>Version {version}</AppShell.Footer>
      </AppShell>
      <TanStackRouterDevtools position="top-left" />
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
});
