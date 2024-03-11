import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteColor {
    sideBarBlack?: string;
    sideBarRed?: string;
    sideBarGreen?: string;
    sideBarYellow?: string;
    sideBarBlue?: string;
    sideBarPurple?: string;
  }
  interface SimplePaletteColorOptions {
    sideBarBlack?: string;
    sideBarRed?: string;
    sideBarGreen?: string;
    sideBarYellow?: string;
    sideBarBlue?: string;
    sideBarPurple?: string;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    sideBarBlack: true;
    sideBarRed: true;
    sideBarGreen: true;
    sideBarYellow: true;
    sideBarBlue: true;
    sideBarPurple: true;
  }
}

export type ColorKeys =
  | "sideBarBlack"
  | "sideBarRed"
  | "sideBarGreen"
  | "sideBarYellow"
  | "sideBarBlue"
  | "sideBarPurple"
const colors: Record<ColorKeys, string> = {
  sideBarBlack: "#222222",
  sideBarRed: "#D74B4B",
  sideBarGreen: "#228C22",
  sideBarYellow: "#ff6f00",
  sideBarBlue: "#5590D9",
  sideBarPurple: "#6C3082",
};
let theme = createTheme();
for (let color in colors) {
  const key = color as ColorKeys;
  theme = createTheme(theme, {
    palette: {
      primary: {
        main: "#222222",
        light:'#ccc',
        contrastText: "#008FFF",
      },
      secondary: {
        main: "#099DDD",
      },
      [color]: theme.palette.augmentColor({
        color: {
          main: colors[key],
        },
        name: color,
      }),
    },
  });
}

export default theme;
