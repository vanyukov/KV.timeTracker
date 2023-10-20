import type { Meta, StoryObj } from "@storybook/react"
import { OutlinedInput as OutlinedInputComponent } from "./OutlinedInput"

const meta: Meta<typeof OutlinedInputComponent> = {
  component: OutlinedInputComponent,
}

export default meta
type Story = StoryObj<typeof OutlinedInputComponent>

export const OutlinedInput: Story = {
  args: {},
  render: props => (<OutlinedInputComponent {...props} />),
}
