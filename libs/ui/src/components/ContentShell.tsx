import { Flex, Group, Paper, Title } from "@mantine/core";
import { PropsWithChildren, ReactElement } from "react";

type Props = PropsWithChildren<{
  title: string;
  actions?: ReactElement[];
  breadcrumbs?: ReactElement;
}>;

export function ContentShell({ title, breadcrumbs, actions, children }: Props) {
  return (
    <>
      {breadcrumbs}
      <Flex justify="space-between">
        <Title>{title}</Title>
        <Group>{actions}</Group>
      </Flex>
      <Paper my="lg">{children}</Paper>
    </>
  );
}
