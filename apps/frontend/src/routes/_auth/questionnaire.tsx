import { ActionIcon, Affix, Container, IconMaximize, IconMaximizeOff, useFullscreen } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/questionnaire")({
  component: QuestionnaireLayout,
});

function QuestionnaireLayout() {
  const { fullscreen, toggle } = useFullscreen();

  return (
    <Container size="md" mt="xl">
      <Outlet />
      <Affix position={{ bottom: 100, right: 40 }}>
        <ActionIcon variant="outline" radius="xl" size="xl" onClick={toggle}>
          {fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
        </ActionIcon>
      </Affix>
    </Container>
  );
}
