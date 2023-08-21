import * as MuiTableHead from "@mui/material/TableHead"

export type TableHeadProps = MuiTableHead.TableHeadProps

export function TableHead({ children, ...props }: TableHeadProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTableHead.default {...props}>{children}</MuiTableHead.default>
}
