import { Group } from "@mantine/core";

type LogoItem = {
  path: string;
  alt: string;
  url: string;
};

type Props = {
  logos: LogoItem[];
};

export function FooterLogos({ logos }: Props) {
  return (
    <Group>
      {logos.map((logo) => (
        <a href={logo.url} key={logo.path}>
          <img src={logo.path} alt={logo.alt} height={50} />
        </a>
      ))}
    </Group>
  );
}
