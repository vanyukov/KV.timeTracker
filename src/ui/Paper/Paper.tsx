import * as MuiPaper from "@mui/material/Paper"

export type PaperProps = MuiPaper.PaperProps

export function Paper({ children, ...props }: PaperProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiPaper.default {...props}>{children}</MuiPaper.default>
}
