import { Group } from "@mantine/core";
import UZHLogo from "../assets/uzh-logo.svg?react";
import WeltentdeckerLogo from "../assets/weltentdecker-logo.png";

export function FooterLogos() {
  return (
    <Group>
      <a href="https://uzh.ch">
        <UZHLogo />
      </a>
      <a href="https://www.psychologie.uzh.ch/de/bereiche/dev/devpsy/Weltentdecker.html">
        <img src={WeltentdeckerLogo} height={50} />
      </a>
    </Group>
  );
}
