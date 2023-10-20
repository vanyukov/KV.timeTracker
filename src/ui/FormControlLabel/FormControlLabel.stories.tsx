import type { Meta, StoryObj } from "@storybook/react"
import { FormControlLabel as FormControlLabelComponent } from "./FormControlLabel"

const meta: Meta<typeof FormControlLabelComponent> = {
  component: FormControlLabelComponent,
}

export default meta
type Story = StoryObj<typeof FormControlLabelComponent>

export const FormControlLabel: Story = {
  args: {},
  render: props => (<FormControlLabelComponent {...props} />),
}
