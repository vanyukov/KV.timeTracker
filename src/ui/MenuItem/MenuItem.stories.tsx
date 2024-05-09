import type { Meta, StoryObj } from "@storybook/react"
import { MenuItem as MenuItemComponent } from "./MenuItem"

const meta: Meta<typeof MenuItemComponent> = {
  component: MenuItemComponent,
}

export default meta
type Story = StoryObj<typeof MenuItemComponent>

export const MenuItem: Story = {
  args: {
    children: "MenuItem",
  },
  render: props => (<MenuItemComponent {...props} />),
}
