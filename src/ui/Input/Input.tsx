import * as MuiInput from "@mui/material/Input"

export type InputProps = MuiInput.InputProps

export function Input(props: InputProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiInput.default {...props} />
}
