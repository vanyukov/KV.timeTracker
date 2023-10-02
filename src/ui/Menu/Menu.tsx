import * as MuiMenu from "@mui/material/Menu"

export type MenuProps = MuiMenu.MenuProps

export function Menu({ children, ...props }: MenuProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiMenu.default {...props}>{children}</MuiMenu.default>
}
