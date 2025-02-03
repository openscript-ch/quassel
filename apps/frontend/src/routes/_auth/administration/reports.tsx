import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationReportsRoute", {
  title: "Reports",
});

export const Route = createFileRoute("/_auth/administration/reports")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
