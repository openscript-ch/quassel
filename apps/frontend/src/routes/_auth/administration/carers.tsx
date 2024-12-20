import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationCarersRoute", {
  title: "Carers",
});

export const Route = createFileRoute("/_auth/administration/carers")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
