import * as MuiOutlinedInput from "@mui/material/OutlinedInput"

export type OutlinedInputProps = MuiOutlinedInput.OutlinedInputProps

export function OutlinedInput(props: OutlinedInputProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiOutlinedInput.default {...props} />
}
