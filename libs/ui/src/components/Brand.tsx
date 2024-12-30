import { Group, Stack, Title } from "@mantine/core";
import Logo from "../assets/logo.svg?react";

export function Brand() {
  return (
    <Group className="quassel-Brand" gap="md">
      <Logo className="quassel-Logo" />
      <Stack gap={0}>
        <Title order={2} c="black">
          LEMON
        </Title>
      </Stack>
    </Group>
  );
}
