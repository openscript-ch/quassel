import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useEffect } from "react";
import { $layout } from "../../stores/layout";
import { i18n } from "../../stores/i18n";
import { ContentShell } from "@quassel/ui";
import { BreadcrumbsNavigation } from "../../components/BreadcrumbsNavigation";

const messages = i18n("AdministrationRoute", {
  title: "Administration",
});

function AdministrationLayout() {
  useEffect(() => {
    $layout.set({ admin: true });
    return () => $layout.set({ admin: false });
  }, []);

  const matches = useMatches();
  const title = matches[matches.length - 2]?.context.title;
  const actions = matches[matches.length - 1]?.context.actions;

  return (
    <ContentShell title={title || messages.get().title} breadcrumbs={<BreadcrumbsNavigation />} actions={actions}>
      <Outlet />
    </ContentShell>
  );
}

export const Route = createFileRoute("/_auth/administration")({
  beforeLoad: () => ({ title: messages.get().title }),
  component: AdministrationLayout,
});
