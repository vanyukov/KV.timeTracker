import * as MuiInputLabel from "@mui/material/InputLabel"

export type InputLabelProps = MuiInputLabel.InputLabelProps

export function InputLabel({ children, ...props }: InputLabelProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiInputLabel.default {...props}>{children}</MuiInputLabel.default>
}
