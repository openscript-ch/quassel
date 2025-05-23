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
  FooterLogos,
  ErrorDisplay,
  IconReportAnalytics,
} from "@quassel/ui";
import { createRootRouteWithContext, Link, Outlet, RouteContext, useNavigate } from "@tanstack/react-router";
import { version } from "../../package.json";
import { $session } from "../stores/session";
import { useStore } from "@nanostores/react";
import { $layout } from "../stores/layout";
import { $api } from "../stores/api";
import { DefaultError, useQueryClient } from "@tanstack/react-query";
import { i18n } from "../stores/i18n";
import { C } from "../configuration";
import logo from "/logo.svg";
import { LogosConfig, logosConfigSchema } from "../schemas/logosConfigSchema";
import { Value } from "@sinclair/typebox/value";

const messages = i18n("RootRoute", {
  title: "Home",
});

let logos: LogosConfig;

try {
  logos = Value.Parse(logosConfigSchema, JSON.parse(C.env.logos));
} catch (error) {
  console.error("Failed to parse C.env.logos:", error);
  logos = [];
}

function Root() {
  const n = useNavigate();
  const sessionStore = useStore($session);
  const layoutStore = useStore($layout);
  const signOut = () => {
    $session.set({});
    n({ to: "/session" });
  };
  const signOutMutation = $api.useMutation("delete", "/session", { onSettled: signOut });
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
        header={{ height: 104, collapsed: layoutStore.fullscreen }}
        footer={{ height: 84, collapsed: layoutStore.fullscreen }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: !layoutStore.admin } }}
        padding="xl"
        mod={{ admin: layoutStore.admin }}
      >
        <AppShell.Header>
          <Group justify="space-between">
            <Link to="/">
              <Brand title={C.env.title} logoPath={logo} />
            </Link>
            {sessionStore.email && (
              <Group>
                <Text>{sessionStore.email}</Text>
                <Button variant="outline" leftSection={<IconLogout />} onClick={handleSignOut}>
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
            <NavLink component={Link} to="/administration/export" leftSection={<IconDatabaseExport />} label="Export" />
            <NavLink component={Link} to="/administration/reports" leftSection={<IconReportAnalytics />} label="Reports" />
            <NavLink component={Link} to="/administration/users" leftSection={<IconUsers />} label="Users" />
          </AppShell.Navbar>
        )}

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>

        <AppShell.Footer>
          <Group justify="space-between">
            <FooterLogos logos={logos} />
            Version {version}
          </Group>
        </AppShell.Footer>
      </AppShell>
    </>
  );
}

export const Route = createRootRouteWithContext<RouteContext>()({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Root,
  errorComponent: ErrorDisplay,
  notFoundComponent: () => <ErrorDisplay title="Page not found" />,
});
