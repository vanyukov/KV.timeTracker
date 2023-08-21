import * as MuiTable from "@mui/material/Table"

export type TableProps = MuiTable.TableProps

export function Table({ children, ...props }: TableProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTable.default {...props}>{children}</MuiTable.default>
}
