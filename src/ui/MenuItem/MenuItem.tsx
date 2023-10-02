import * as MuiMenuItem from "@mui/material/MenuItem"

export type MenuItemProps = MuiMenuItem.MenuItemProps

export function MenuItem({ children, ...props }: MenuItemProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiMenuItem.default {...props}>{children}</MuiMenuItem.default>
}
