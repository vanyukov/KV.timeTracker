/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { createTheme } from "@mui/material"
import { palette } from "./palette"
import { components } from "./components"

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export const theme = createTheme({
  palette,
  components,
  typography: {
    fontSize: 14,
    body1: {
      fontSize: 14,
    },
  },
})
