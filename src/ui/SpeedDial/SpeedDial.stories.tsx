import type { Meta, StoryObj } from "@storybook/react"
import { SpeedDial as SpeedDialComponent } from "./SpeedDial"

const meta: Meta<typeof SpeedDialComponent> = {
  component: SpeedDialComponent,
}

export default meta
type Story = StoryObj<typeof SpeedDialComponent>

export const SpeedDial: Story = {
  args: {},
  render: props => (<SpeedDialComponent {...props} />),
}
