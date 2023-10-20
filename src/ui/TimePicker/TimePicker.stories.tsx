import type { Meta, StoryObj } from "@storybook/react"
import { TimePicker as TimePickerComponent } from "./TimePicker"

const meta: Meta<typeof TimePickerComponent> = {
  component: TimePickerComponent,
}

export default meta
type Story = StoryObj<typeof TimePickerComponent>

export const TimePicker: Story = {
  args: {},
  render: props => (<TimePickerComponent {...props} />),
}
