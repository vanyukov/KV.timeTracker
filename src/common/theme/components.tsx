import { LinkBehavior } from "ui"
import { MuiLink } from "./componentsMui"

export const components = {
  MuiLink,
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
}
