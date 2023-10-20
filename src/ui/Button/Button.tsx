import * as MuiButton from "@mui/material/Button"

export type ButtonProps = MuiButton.ButtonProps

export function Button({ children, ...props }: ButtonProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiButton.default variant="contained" {...props}>{children}</MuiButton.default>
}
