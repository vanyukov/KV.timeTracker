import type { Meta, StoryObj } from "@storybook/react"
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded"
import { Button as UiButton } from "./Button"

const meta: Meta<typeof UiButton> = {
  component: UiButton,
}

export default meta
type Story = StoryObj<typeof UiButton>

export const Button: Story = {
  args: {
    size: "medium",
    variant: "contained",
    disabled: false,
    color: "primary",
  },
  render: props => (
    <>
      <UiButton {...props}>Button</UiButton>
      <UiButton {...props} variant="outlined">
        outlined
      </UiButton>
      <UiButton {...props} variant="text">
        text
      </UiButton>
      <UiButton {...props} variant="contained" color="secondary">
        secondary
      </UiButton>
      <UiButton {...props} disabled>
        disabled
      </UiButton>
      <UiButton {...props} size="small">
        small
      </UiButton>
      <UiButton {...props} size="large">
        large
      </UiButton>
      <div className="w100" />
      <UiButton
        variant="contained"
        {...props}
        startIcon={<ChevronRightRounded className="rotate180" />}
      >
        Button
      </UiButton>
      <UiButton variant="contained" {...props} endIcon={<ChevronRightRounded />}>
        Button
      </UiButton>
    </>
  ),
}
