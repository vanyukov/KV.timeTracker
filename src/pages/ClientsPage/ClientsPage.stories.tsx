import type { Meta, StoryObj } from "@storybook/react"
import { ClientsPage as ClientsPageComponent } from "./ClientsPage"

const meta: Meta<typeof ClientsPageComponent> = {
  component: ClientsPageComponent,
}

export default meta
type Story = StoryObj<typeof ClientsPageComponent>

export const ClientsPage: Story = {
  render: () => <ClientsPageComponent />,
}
