import { ActionIcon, Affix, Container, IconMaximize, IconMaximizeOff, useFullscreen } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { $layout } from "../../stores/layout";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/questionnaire")({
  component: QuestionnaireLayout,
});

function QuestionnaireLayout() {
  const { fullscreen, toggle } = useFullscreen();

  useEffect(() => {
    $layout.set({ fullscreen });
  }, [fullscreen]);

  return (
    <Container size={fullscreen ? "100%" : "md"} p={0} mt={fullscreen ? 0 : "xl"}>
      <Outlet />
      <Affix position={{ bottom: 110, right: 40 }}>
        <ActionIcon variant="outline" radius="xl" size="xl" onClick={toggle}>
          {fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
        </ActionIcon>
      </Affix>
    </Container>
  );
}
