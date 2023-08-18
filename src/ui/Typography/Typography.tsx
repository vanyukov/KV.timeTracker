import * as MuiTypography from "@mui/material/Typography"

export type TypographyProps = MuiTypography.TypographyProps

export function Typography({ children, ...props }: TypographyProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <MuiTypography.default {...props}>{children}</MuiTypography.default>
}
