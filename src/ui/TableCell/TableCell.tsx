import * as MuiTableCell from "@mui/material/TableCell"

export type TableCellProps = MuiTableCell.TableCellProps

export function TableCell({ children, ...props }: TableCellProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTableCell.default {...props}>{children}</MuiTableCell.default>
}
