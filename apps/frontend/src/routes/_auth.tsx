import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { $session } from "../stores/session";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ location }) => {
    if (!$session.get().email) {
      throw redirect({ to: "/session", search: { redirect: location.href } });
    }
  },
  component: () => <Outlet />,
});
