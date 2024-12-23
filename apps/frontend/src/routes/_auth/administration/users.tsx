import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationUsersRoute", {
  title: "Users",
});

export const Route = createFileRoute("/_auth/administration/users")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
