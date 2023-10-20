import * as MuiFormControlLabel from "@mui/material/FormControlLabel"

export type FormControlLabelProps = MuiFormControlLabel.FormControlLabelProps

export function FormControlLabel(props: FormControlLabelProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiFormControlLabel.default {...props} />
}
