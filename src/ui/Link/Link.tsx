import React from "react"
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom"
import * as MuiLink from "@mui/material/Link"

export type LinkProps = MuiLink.LinkProps

export const LinkBehavior = React.forwardRef<
HTMLAnchorElement,
Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

export function Link({ children, ...props }: LinkProps) {
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <MuiLink.default underline="hover" {...props}>
      {children}
    </MuiLink.default>
  )
}
