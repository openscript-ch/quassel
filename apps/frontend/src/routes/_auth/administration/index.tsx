import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationDashboardRoute", {
  title: "Dashboard",
});

function Index() {
  return null;
}

export const Route = createFileRoute("/_auth/administration/")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Index,
});
