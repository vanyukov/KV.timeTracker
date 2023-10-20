import * as MuiTableRow from "@mui/material/TableRow"

export type TableRowProps = MuiTableRow.TableRowProps

export function TableRow({ children, ...props }: TableRowProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTableRow.default {...props}>{children}</MuiTableRow.default>
}
