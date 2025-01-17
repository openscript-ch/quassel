import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { $session } from "../stores/session";
import { $api } from "../stores/api";
import { ErrorDisplay } from "@quassel/ui";

const clearAndRedirect = (href: string) => {
  $session.set({});
  throw redirect({ to: "/session", search: { redirect: href } });
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location, context }) => {
    if (!$session.get().email) {
      clearAndRedirect(location.href);
    }
    try {
      const expiresAt = $session.get().expiresAt;
      if (expiresAt && expiresAt < Date.now() / 1000) {
        const sessionQuery = await context.queryClient.fetchQuery($api.queryOptions("get", "/session"));
        if (sessionQuery.expiresAt < Date.now() / 1000) {
          clearAndRedirect(location.href);
        } else {
          $session.set(sessionQuery);
        }
      }
    } catch {
      clearAndRedirect(location.href);
    }
  },
  component: () => <Outlet />,
  errorComponent: ErrorDisplay,
});
