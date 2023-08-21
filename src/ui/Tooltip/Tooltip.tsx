import * as MuiTooltip from "@mui/material/Tooltip"

export type TooltipProps = MuiTooltip.TooltipProps

export function Tooltip({ children, ...props }: TooltipProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTooltip.default {...props}>{children}</MuiTooltip.default>
}
