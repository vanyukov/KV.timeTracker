import type { Meta, StoryObj } from "@storybook/react"
import { ClientEditPage as ClientEditPageComponent } from "./ClientEditPage"

const meta: Meta<typeof ClientEditPageComponent> = {
  component: ClientEditPageComponent,
}

export default meta
type Story = StoryObj<typeof ClientEditPageComponent>

export const ClientEditPage: Story = {
  render: () => <ClientEditPageComponent />,
}
