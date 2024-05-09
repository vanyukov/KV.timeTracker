import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "ui/Input"
import { InputLabel as InputLabelComponent } from "./InputLabel"

const meta: Meta<typeof InputLabelComponent> = {
  component: InputLabelComponent,
}

export default meta
type Story = StoryObj<typeof InputLabelComponent>

export const InputLabel: Story = {
  args: {},
  render: props => (
    <InputLabelComponent {...props}>
      <Input />
    </InputLabelComponent>
  ),
}
