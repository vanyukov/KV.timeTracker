import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

export function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={theme}
    >
      {props.children}
    </MantineProvider>
  )
}
