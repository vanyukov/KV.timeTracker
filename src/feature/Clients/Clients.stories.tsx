import type { Meta, StoryObj } from "@storybook/react"
import { Clients as ClientsComponent } from "./Clients"

const meta: Meta<typeof ClientsComponent> = {
  component: ClientsComponent,
}

export default meta
type Story = StoryObj<typeof ClientsComponent>

export const Clients: Story = {
  args: {},
  render: props => (<ClientsComponent {...props} />),
}
