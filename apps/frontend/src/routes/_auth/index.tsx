import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "../../sections/HeroSection";

function Index() {
  return (
    <>
      <HeroSection />
    </>
  );
}

export const Route = createFileRoute("/_auth/")({
  component: Index,
});
