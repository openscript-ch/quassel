import { MantineProvider, MantineThemeOverride, MantineProviderProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "./Theme.css";

type ThemeProviderProps = MantineProviderProps;

export const theme: MantineThemeOverride = {
  // based on https://www.cd.uzh.ch/dam/jcr:ceea0afd-0f51-442c-b4ca-c49bb6bd1220/uzh-corporate-colors-rgb.pdf
  colors: {
    // https://mantine.dev/colors-generator/?color=0028A5
    uzhBlue: ["#ebf0ff", "#d2dbfa", "#a0b4f7", "#6c8af6", "#4367f6", "#2e51f6", "#2446f7", "#1a38dd", "#1232c5", "#002aad"],
    // https://mantine.dev/colors-generator/?color=4AC9E3
    uzhCyan: ["#e0fdff", "#cff4fc", "#a5e6f3", "#76d7eb", "#51cbe4", "#37c3e0", "#21c0df", "#01a9c6", "#0096b2", "#00839d"],
    // https://mantine.dev/colors-generator/?color=A5D233
    uzhGreen: ["#f6fde6", "#edf7d5", "#dbedac", "#c7e380", "#b7da5b", "#acd543", "#a6d336", "#90ba27", "#7fa51e", "#6c8f0f"],
    // https://mantine.dev/colors-generator/?color=FFC845
    uzhGold: ["#fff9df", "#fff1ca", "#ffe299", "#ffd163", "#ffc336", "#ffbb18", "#ffb602", "#e4a000", "#cb8d00", "#b07900"],
    // https://mantine.dev/colors-generator/?color=FC4C02
    uzhOrange: ["#ffeee3", "#ffddcd", "#ffb99b", "#fe9366", "#fd7238", "#fd5e1b", "#fd530b", "#e24300", "#ca3a00", "#b02e00"],
    // https://mantine.dev/colors-generator/?color=BF0D3E
    uzhBerry: ["#ffeaf1", "#fcd3de", "#f6a3ba", "#f27194", "#ee4874", "#ed2f5f", "#ed2255", "#d31646", "#bd0d3d", "#a60033"],
    // https://mantine.dev/colors-generator/?color=000000
    uzhBlack: ["#f5f5f5", "#e7e7e7", "#cdcdcd", "#b2b2b2", "#9a9a9a", "#8b8b8b", "#848484", "#717171", "#656565", "#575757"],
    // https://mantine.dev/colors-generator/?color=FFFFFF
    uzhWhite: ["#f5f5f5", "#e7e7e7", "#cdcdcd", "#b2b2b2", "#9a9a9a", "#8b8b8b", "#848484", "#717171", "#656565", "#575757"],
  },
  primaryColor: "uzhBlue",
};

export function ThemeProvider(args: ThemeProviderProps) {
  return <MantineProvider {...args} theme={theme} />;
}
