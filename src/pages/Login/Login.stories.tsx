import type { Meta, StoryObj } from "@storybook/react"
import { Login as LoginComponent } from "./Login"

const meta: Meta<typeof LoginComponent> = {
  component: LoginComponent,
}

export default meta
type Story = StoryObj<typeof LoginComponent>

export const Login: Story = {
  render: () => <LoginComponent />,
}
