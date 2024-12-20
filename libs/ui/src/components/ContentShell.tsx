import { Flex, Paper, Title } from "@mantine/core";
import { PropsWithChildren, ReactElement } from "react";

type Props = PropsWithChildren<{
  title: string;
  actions?: ReactElement[];
}>;

export function ContentShell({ title, actions, children }: Props) {
  return (
    <>
      <Flex justify="space-between">
        <Title>{title}</Title>
        <div>{actions}</div>
      </Flex>
      <Paper my="lg">{children}</Paper>
    </>
  );
}
