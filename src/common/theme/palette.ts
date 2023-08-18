import { type PaletteOptions } from "@mui/material/styles/createPalette"
import { blueGrey } from "@mui/material/colors"

// pallete info https://mui.com/material-ui/customization/palette/
// colors info https://mui.com/material-ui/customization/color/
export const palette: PaletteOptions = {
  secondary: {
    main: blueGrey[600],
    light: blueGrey[200],
    dark: blueGrey[800],
    contrastText: blueGrey[100],
  },
}
