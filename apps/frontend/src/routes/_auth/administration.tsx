import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { $layout } from "../../stores/layout";

export const Route = createFileRoute("/_auth/administration")({
  component: AdministrationLayout,
});

function AdministrationLayout() {
  useEffect(() => {
    $layout.set({ admin: true });
    return () => $layout.set({ admin: false });
  }, []);

  return (
    <>
      <h2>Admin</h2>
      <Outlet />
    </>
  );
}
