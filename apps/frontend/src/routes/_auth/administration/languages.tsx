import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationLanguagesRoute", {
  title: "Languages",
});

export const Route = createFileRoute("/_auth/administration/languages")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
