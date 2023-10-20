import type { Meta, StoryObj } from "@storybook/react"
import { SpeedDialAction as SpeedDialActionComponent } from "./SpeedDialAction"

const meta: Meta<typeof SpeedDialActionComponent> = {
  component: SpeedDialActionComponent,
}

export default meta
type Story = StoryObj<typeof SpeedDialActionComponent>

export const SpeedDialAction: Story = {
  args: {},
  render: props => (<SpeedDialActionComponent {...props} />),
}
