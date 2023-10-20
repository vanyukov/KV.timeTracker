import { LinkBehavior } from "ui"
import { MuiLink, MuiTableRow } from "./componentsMui"

export const components = {
  MuiLink,
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
  MuiTableRow,
}
