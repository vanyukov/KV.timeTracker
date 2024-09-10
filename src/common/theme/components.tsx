import { LinkBehavior } from "ui"
import { MuiCheckbox, MuiLink, MuiTableRow } from "./componentsMui"

export const components = {
  MuiLink,
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
  MuiTableRow,
  MuiCheckbox,
}
