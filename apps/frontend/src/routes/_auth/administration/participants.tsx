import { createFileRoute, Outlet } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";

const messages = i18n("AdministrationParticipantsRoute", {
  title: "Participants",
});

export const Route = createFileRoute("/_auth/administration/participants")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: Outlet,
});
