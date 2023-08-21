import * as MuiTableBody from "@mui/material/TableBody"

export type TableBodyProps = MuiTableBody.TableBodyProps

export function TableBody({ children, ...props }: TableBodyProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTableBody.default {...props}>{children}</MuiTableBody.default>
}
