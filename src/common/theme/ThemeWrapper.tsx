import { MantineProvider } from "@mantine/core"
import { theme } from "./theme"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={theme}
    >
      {children}
    </MantineProvider>
  )
}
