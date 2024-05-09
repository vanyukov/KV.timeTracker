import type { Meta, StoryObj } from "@storybook/react"
import { menuItems } from "layout/Header/menuItems"
import { MenuComponent as MenuComponentComponent } from "./MenuComponent"

const meta: Meta<typeof MenuComponentComponent> = {
  component: MenuComponentComponent,
}

export default meta
type Story = StoryObj<typeof MenuComponentComponent>

export const MenuComponent: Story = {
  args: {
    title: "Menu",
    items: menuItems,
  },
  render: props => <MenuComponentComponent {...props} />,
}
