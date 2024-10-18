import { createFileRoute, redirect } from "@tanstack/react-router";
import { $session } from "../stores/sessionStore";

export const Route = createFileRoute("/")({
  loader: () => {
    if ($session.get().token) {
      throw redirect({ to: "/session" });
    }
  },
  component: () => <div>Hello /!</div>,
});
