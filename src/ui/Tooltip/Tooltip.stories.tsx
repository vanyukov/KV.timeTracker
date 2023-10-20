import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip as TooltipComponent } from "./Tooltip"

const meta: Meta<typeof TooltipComponent> = {
  component: TooltipComponent,
}

export default meta
type Story = StoryObj<typeof TooltipComponent>

export const Tooltip: Story = {
  args: {},
  render: props => (<TooltipComponent {...props} />),
}
