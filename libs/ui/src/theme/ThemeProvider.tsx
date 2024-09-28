import { MantineProvider, MantineProviderProps } from "@mantine/core";
import { theme } from "./Theme";
import "@mantine/core/styles.css";

type ThemeProviderProps = MantineProviderProps;

export function ThemeProvider(args: ThemeProviderProps) {
  return <MantineProvider {...args} theme={theme} />;
}
