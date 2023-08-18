import { type LinkProps } from "@mui/material/Link"
import { LinkBehavior } from "ui"

export const MuiLink = {
  defaultProps: {
    component: LinkBehavior,
  } satisfies LinkProps,
  styleOverrides: {
    root: {},
  },
}
