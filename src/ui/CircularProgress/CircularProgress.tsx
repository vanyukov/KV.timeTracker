import * as MuiCircularProgress from "@mui/material/CircularProgress"

export type CircularProgressProps = MuiCircularProgress.CircularProgressProps

export function CircularProgress(props: CircularProgressProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiCircularProgress.default {...props} />
}
