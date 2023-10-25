import type { Meta, StoryObj } from "@storybook/react"
import { Select as SelectComponent } from "./Select"

const meta: Meta<typeof SelectComponent> = {
  component: SelectComponent,
}

export default meta
type Story = StoryObj<typeof SelectComponent>

export const Select: Story = {
  args: {},
  render: props => (<SelectComponent {...props} />),
}
