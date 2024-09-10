import * as MuiCheckbox from "@mui/material/Checkbox"

export type CheckboxProps = MuiCheckbox.CheckboxProps

export function Checkbox(props: CheckboxProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiCheckbox.default {...props} />
}
