import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationExportRoute", {
  title: "Export",
});

export const Route = createFileRoute("/_auth/administration/export")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
