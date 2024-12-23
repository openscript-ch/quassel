import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationQuestionnairesRoute", {
  title: "Questionnaires",
});

export const Route = createFileRoute("/_auth/administration/questionnaires")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
