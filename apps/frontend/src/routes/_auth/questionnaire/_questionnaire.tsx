import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { $questionnaire } from "../../../stores/questionnaire";

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire")({
  beforeLoad: ({ location }) => {
    if (!$questionnaire.get()) {
      throw redirect({ to: "/questionnaire", search: { redirect: location.href } });
    }
  },
  component: () => <Outlet />,
});
