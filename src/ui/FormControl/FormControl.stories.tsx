import type { Meta, StoryObj } from "@storybook/react"
import { FormControl as FormControlComponent } from "./FormControl"

const meta: Meta<typeof FormControlComponent> = {
  component: FormControlComponent,
}

export default meta
type Story = StoryObj<typeof FormControlComponent>

export const FormControl: Story = {
  args: {},
  render: props => (<FormControlComponent {...props} />),
}
