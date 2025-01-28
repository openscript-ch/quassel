import { MantineProvider, MantineThemeOverride, MantineProviderProps } from "@mantine/core";
import "./Theme.css";
import { DatesProvider } from "@openscript-ch/mantine-dates";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { convertUZHColorsToMantine, UZHColor, uzhColors } from "./uzh";

dayjs.extend(utc);

type ExtendedCustomColors = UZHColor | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

type ThemeProviderProps = MantineProviderProps;

export const theme: MantineThemeOverride = {
  colors: {
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
};

export function ThemeProvider({ children, ...args }: ThemeProviderProps) {
  return (
    <DatesProvider settings={{ timezone: "UTC" }}>
      <MantineProvider {...args} theme={theme}>
        <Notifications />
        {children}
      </MantineProvider>
    </DatesProvider>
  );
}
