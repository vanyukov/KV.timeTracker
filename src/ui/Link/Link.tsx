import {
  Link as LinkRouter,
  LinkProps as LinkRouterProps,
} from "react-router-dom"

export type LinkProps = LinkRouterProps

export function Link({ children, ...props }: LinkProps) {
  return <LinkRouter {...props}>{children}</LinkRouter>
}
