import { Group, Stack, Title } from "@mantine/core";
import React, { ComponentType } from "react";

type Props = {
  title: string;
  Logo: ComponentType<React.SVGProps<SVGSVGElement> | React.ImgHTMLAttributes<HTMLImageElement>>;
};

export function Brand({ title, Logo }: Props) {
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
