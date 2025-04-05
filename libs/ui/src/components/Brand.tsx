import { Group, Stack, Title } from "@mantine/core";
import Logo from "../assets/logo.svg?react";

type Props = {
  title: string;
};

export function Brand({ title }: Props) {
  return (
    <Group className="quassel-Brand" gap="md">
      <Logo className="quassel-Logo" />
      <Stack gap={0}>
        <Title order={2} c="black">
          {title}
        </Title>
      </Stack>
    </Group>
  );
}
