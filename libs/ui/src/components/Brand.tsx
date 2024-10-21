import { Divider, Group, Text } from "@mantine/core";
import Logo from "../theme/Logo.svg?react";

export function Brand() {
  return (
    <Group gap={30}>
      <Logo />
      <Divider orientation="vertical" />
      <Text size="xl" fw={600} c="black">
        Quassel
      </Text>
    </Group>
  );
}
