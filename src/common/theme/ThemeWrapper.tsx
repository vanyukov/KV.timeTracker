import { CssBaseline, ThemeProvider } from "@mui/material"
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import "@fontsource/roboto/latin-300.css"
import "@fontsource/roboto/latin-400.css"
import "@fontsource/roboto/latin-500.css"
import "@fontsource/roboto/latin-700.css"
import { theme } from "./theme"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeCSSProv = extendTheme(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CssVarsProvider theme={themeCSSProv}>
        {children}
      </CssVarsProvider>
    </ThemeProvider>
  )
}
