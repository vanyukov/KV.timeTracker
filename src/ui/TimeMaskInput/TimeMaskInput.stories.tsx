import type { Meta, StoryObj } from "@storybook/react"
import { TimeMaskInput as TimeMaskInputComponent } from "./TimeMaskInput"

const meta: Meta<typeof TimeMaskInputComponent> = {
  component: TimeMaskInputComponent,
}

export default meta
type Story = StoryObj<typeof TimeMaskInputComponent>

export const TimeMaskInput: Story = {
  args: {},
  render: props => (<TimeMaskInputComponent {...props} />),
}
