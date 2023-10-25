import * as MuiSelect from "@mui/material/Select"

export type SelectProps = MuiSelect.SelectProps

export function Select({ children, ...props }: SelectProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiSelect.default {...props}>{children}</MuiSelect.default>
}
