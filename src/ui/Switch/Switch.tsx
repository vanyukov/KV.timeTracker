import * as MuiSwitch from "@mui/material/Switch"

export type SwitchProps = MuiSwitch.SwitchProps

export function Switch(props: SwitchProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiSwitch.default {...props} />
}
