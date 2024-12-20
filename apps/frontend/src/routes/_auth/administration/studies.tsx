import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationStudiesRoute", {
  title: "Studies",
});

export const Route = createFileRoute("/_auth/administration/studies")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
