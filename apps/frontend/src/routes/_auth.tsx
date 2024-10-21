import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { $session } from "../stores/session";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ location }) => {
    console.log($session.get());
    if (!$session.get().token) {
      throw redirect({ to: "/session", search: { redirect: location.href } });
    }
  },
  component: () => <Outlet />,
});
