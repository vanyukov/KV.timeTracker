export const MuiTableRow = {
  styleOverrides: {
    root: {
      "&.Mui-selected": {
        backgroundColor: "color-mix(in srgb, var(--mui-palette-success-main) 20%, white)",
      },
      "&:hover, &.Mui-selected:hover": {
        backgroundColor: "color-mix(in srgb, var(--mui-palette-success-main) 30%, white)",
      },
    },
  },
}
