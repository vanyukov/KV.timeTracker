import * as MuiTableContainer from "@mui/material/TableContainer"

export type TableContainerProps = MuiTableContainer.TableContainerProps

export function TableContainer({ children, ...props }: TableContainerProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTableContainer.default {...props}>{children}</MuiTableContainer.default>
}
