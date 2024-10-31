import { Title } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/")({
  component: Index,
});

function Index() {
  return <Title>Welcome to the administration interface!</Title>;
}
