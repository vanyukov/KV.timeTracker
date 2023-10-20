import * as MuiTextField from "@mui/material/TextField"

export type TextFieldProps = MuiTextField.TextFieldProps

export function TextField({ children, ...props }: TextFieldProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTextField.default {...props}>{children}</MuiTextField.default>
}
