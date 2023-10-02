import * as MuiSpeedDialAction from "@mui/material/SpeedDialAction"

export type SpeedDialActionProps = MuiSpeedDialAction.SpeedDialActionProps

export function SpeedDialAction({ children, ...props }: SpeedDialActionProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiSpeedDialAction.default {...props}>{children}</MuiSpeedDialAction.default>
}
