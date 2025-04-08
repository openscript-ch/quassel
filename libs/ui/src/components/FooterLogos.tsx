import { Group } from "@mantine/core";

type LogoItem = {
  src: string;
  href: string;
  alt: string;
  height?: number;
};

type FooterLogosProps = {
  logos: LogoItem[];
};

export function FooterLogos({ logos }: FooterLogosProps) {
  return (
    <Group>
      {logos.map((logo, index) => (
        <a key={index} href={logo.href}>
          <img src={logo.src} alt={logo.alt} height={logo.height || 50} />
        </a>
      ))}
    </Group>
  );
}
