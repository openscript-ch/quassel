import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { $layout } from "../../stores/layout";

function AdministrationLayout() {
  useEffect(() => {
    $layout.set({ admin: true });
    return () => $layout.set({ admin: false });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export const Route = createFileRoute("/_auth/administration")({
  component: AdministrationLayout,
});
