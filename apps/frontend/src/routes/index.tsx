import { createFileRoute, redirect } from "@tanstack/react-router";
import { $session } from "../stores/session";
import { HeroSection } from "../sections/HeroSection";

function Index() {
  return (
    <>
      <HeroSection />
    </>
  );
}

export const Route = createFileRoute("/")({
  loader: () => {
    if (!$session.get().token) {
      throw redirect({ to: "/session" });
    }
  },
  component: Index,
});
