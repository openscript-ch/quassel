import { Group, Stack, Title, Image } from "@mantine/core";

type Props = {
  title: string;
  logoUrl: string;
};

export function Brand({ title, logoUrl }: Props) {
  return (
    <Group className="quassel-Brand" gap="md">
      <Image src={logoUrl} className="quassel-Logo" />
      <Stack gap={0}>
        <Title order={2} c="black">
          {title}
        </Title>
      </Stack>
    </Group>
  );
}
