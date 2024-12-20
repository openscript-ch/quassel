import { Paper, Title } from "@mantine/core";
import { PropsWithChildren, ReactElement, useState } from "react";
import { ContentActionsContext } from "../contexts/ContentActionContext";

type Props = PropsWithChildren<{
  title: string;
}>;

export function ContentShell({ title, children }: Props) {
  const [actions, setActions] = useState<ReactElement[]>([]);

  return (
    <ContentActionsContext.Provider
      value={{
        actions,
        registerActions: setActions,
      }}
    >
      <Title>{title}</Title>
      {actions}
      <Paper my="lg">{children}</Paper>
    </ContentActionsContext.Provider>
  );
}
