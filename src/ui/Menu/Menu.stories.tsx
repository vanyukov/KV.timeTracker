import type { Meta, StoryObj } from "@storybook/react"
import { menuItems } from "layout/Header/menuItems"
import { MenuItem } from "ui/MenuItem"
import { Menu as MenuComponent } from "./Menu"

const meta: Meta<typeof MenuComponent> = {
  component: MenuComponent,
}

export default meta
type Story = StoryObj<typeof MenuComponent>

export const Menu: Story = {
  args: {
    open: true,
  },
  render: props => (
    <MenuComponent {...props}>
      {menuItems.map(item => (
        <MenuItem key={item.id}>{item.title}</MenuItem>
      ))}
    </MenuComponent>
  ),
}
