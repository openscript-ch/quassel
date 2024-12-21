import { Group } from "@mantine/core";
import UZHLogo from "../assets/UZHLogo.svg?react";
import KleineWeltentdeckerLogo from "../assets/KleineWeltentdeckerLogo.png";

export function FooterLogos() {
  return (
    <Group>
      <a href="https://uzh.ch">
        <UZHLogo />
      </a>
      <a href="https://www.psychologie.uzh.ch/de/bereiche/dev/devpsy/Weltentdecker.html">
        <img src={KleineWeltentdeckerLogo} height={50} />
      </a>
    </Group>
  );
}
