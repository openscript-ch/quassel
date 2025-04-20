import { Group, Stack, Title } from "@mantine/core";

type Props = {
  title: string;
  logoPath: string;
};

export function Brand({ title, logoPath }: Props) {
  return (
    <Group className="quassel-Brand" gap="md">
      <img src={logoPath} className="quassel-Logo" />
      <Stack gap={0}>
        <Title order={2} c="black">
          {title}
        </Title>
      </Stack>
    </Group>
  );
}
