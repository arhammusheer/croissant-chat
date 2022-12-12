// theme.ts
import "@fontsource/unbounded"
import "@fontsource/open-sans"

// 1. import `extendTheme` function
import {
  extendTheme,
  StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  fonts:{
    heading: `"Unbounded", sans-serif`,
    body: `"Open Sans", sans-serif`,
  },
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("white", "black")(props),
      },
    }),
  },
});

const overrides = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("white", "black")(props),
      },
    }),
  },
});

export default theme;
export { overrides };
