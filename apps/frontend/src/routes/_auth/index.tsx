import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "../../sections/HeroSection";
import { Button } from "@quassel/ui";
import { $api } from "../../stores/api";

function Index() {
  const mutation = $api.useMutation("get", "/users");
  return (
    <>
      <HeroSection />
      <Button onClick={() => mutation.mutate({})}>Fetch users</Button>
    </>
  );
}

export const Route = createFileRoute("/_auth/")({
  component: Index,
});
