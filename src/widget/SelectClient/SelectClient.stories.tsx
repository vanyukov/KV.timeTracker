import type { Meta, StoryObj } from "@storybook/react"
import { SelectClient as SelectClientComponent } from "./SelectClient"

const meta: Meta<typeof SelectClientComponent> = {
  component: SelectClientComponent,
}

export default meta
type Story = StoryObj<typeof SelectClientComponent>

export const SelectClient: Story = {
  args: {},
  render: props => (<SelectClientComponent {...props} />),
}
