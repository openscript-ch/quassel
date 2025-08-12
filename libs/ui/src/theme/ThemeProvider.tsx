import { MantineProvider, MantineThemeOverride, MantineProviderProps, createTheme } from "@mantine/core";
import "./Theme.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { convertUZHColorsToMantine, UZHColor, uzhColors } from "./uzh";
import { ModalsProvider } from "@mantine/modals";

dayjs.extend(utc);

type ExtendedCustomColors = "quassel" | UZHColor | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

type ThemeProviderProps = MantineProviderProps;

export const defaultTheme: MantineThemeOverride = createTheme({
  colors: {
    quassel: ["#e5f9ff", "#d3edfb", "#a9d9f1", "#7cc3e8", "#58b1e1", "#40a6dd", "#30a0dc", "#1f8cc4", "#0b7cb0", "#006c9c"],
    uzhBlue: convertUZHColorsToMantine(uzhColors.uzhBlue),
    uzhCyan: convertUZHColorsToMantine(uzhColors.uzhCyan),
    uzhGreen: convertUZHColorsToMantine(uzhColors.uzhGreen),
    uzhGold: convertUZHColorsToMantine(uzhColors.uzhGold),
    uzhOrange: convertUZHColorsToMantine(uzhColors.uzhOrange),
    uzhBerry: convertUZHColorsToMantine(uzhColors.uzhBerry),
    uzhBlack: convertUZHColorsToMantine(uzhColors.uzhBlack),
    uzhWhite: convertUZHColorsToMantine(uzhColors.uzhWhite),
  },
  primaryColor: "uzhGold",
});

export function ThemeProvider({ children, ...args }: ThemeProviderProps) {
  return (
    <MantineProvider theme={defaultTheme} {...args}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
