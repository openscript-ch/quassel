import { MantineColorsTuple } from "@mantine/core";

export type UZHColor = "uzhBlue" | "uzhCyan" | "uzhGreen" | "uzhGold" | "uzhOrange" | "uzhBerry" | "uzhBlack" | "uzhWhite";
type UZHColorPalette = [string, string, string, string, string, string];

// based on https://www.cd.uzh.ch/dam/jcr:ceea0afd-0f51-442c-b4ca-c49bb6bd1220/uzh-corporate-colors-rgb.pdf
export const uzhColors: { [key in UZHColor]: UZHColorPalette } = {
  uzhBlue: ["#0028A5", "#BACBFF", "#7596FF", "#3062FF", "#001E7C", "#001452"],
  uzhCyan: ["#4AC9E3", "#DBF4F9", "#B7E9F4", "#92DFEE", "#1EA7C4", "#147082"],
  uzhGreen: ["#A5D233", "#ECF6D6", "#DBEDAD", "#C8E485", "#7CA023", "#536B18"],
  uzhGold: ["#FFC845", "#FFF4DA", "#FFE9B5", "#FFDE8F", "#F3AB00", "#A27200"],
  uzhOrange: ["#FC4C02", "#FFDBCC", "#FEB799", "#FE9367", "#BD3902", "#7E2601"],
  uzhBerry: ["#BF0D3E", "#FBC6D4", "#F78CAA", "#F3537F", "#8F0A2E", "#60061F"],
  uzhBlack: ["#000000", "#C2C2C2", "#A3A3A3", "#666666", "#4D4D4D", "#333333"],
  uzhWhite: ["#FFFFFF", "#FAFAFA", "#EFEFEF", "#E7E7E7", "#E0E0E0", "#D7D7D7"],
};

export const convertUZHColorsToMantine = ([base, v1, v2, v3, v4, v5]: UZHColorPalette): MantineColorsTuple => [
  v1,
  v2,
  v3,
  v3,
  base,
  base,
  v4,
  v4,
  v5,
  v5,
];
