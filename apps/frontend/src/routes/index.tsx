import { createFileRoute, redirect } from "@tanstack/react-router";
import { $session } from "../stores/session";

export const Route = createFileRoute("/")({
  loader: () => {
    if (!$session.get().token) {
      throw redirect({ to: "/session" });
    }
  },
  component: () => <div>Hello /!</div>,
});
