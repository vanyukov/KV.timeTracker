import * as MuiSpeedDial from "@mui/material/SpeedDial"

export type SpeedDialProps = MuiSpeedDial.SpeedDialProps

export function SpeedDial({ children, ...props }: SpeedDialProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiSpeedDial.default {...props}>{children}</MuiSpeedDial.default>
}
