import * as MuiFormControl from "@mui/material/FormControl"

export type FormControlProps = MuiFormControl.FormControlProps

export function FormControl({ children, ...props }: FormControlProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiFormControl.default {...props}>{children}</MuiFormControl.default>
}
