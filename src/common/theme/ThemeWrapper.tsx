import { CssBaseline, ThemeProvider } from "@mui/material"
import "@fontsource/roboto/latin-300.css"
import "@fontsource/roboto/latin-400.css"
import "@fontsource/roboto/latin-500.css"
import "@fontsource/roboto/latin-700.css"
import { theme } from "./theme"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
