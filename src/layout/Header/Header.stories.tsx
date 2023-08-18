import type { Meta, StoryObj } from "@storybook/react"
import { Header as HeaderComponent } from "./Header"

const meta: Meta<typeof HeaderComponent> = {
  component: HeaderComponent,
}

export default meta
type Story = StoryObj<typeof HeaderComponent>

export const Header: Story = {
  render: () => <HeaderComponent />,
}
