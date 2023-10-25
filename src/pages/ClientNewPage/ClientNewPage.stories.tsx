import type { Meta, StoryObj } from "@storybook/react"
import { ClientNewPage as ClientNewPageComponent } from "./ClientNewPage"

const meta: Meta<typeof ClientNewPageComponent> = {
  component: ClientNewPageComponent,
}

export default meta
type Story = StoryObj<typeof ClientNewPageComponent>

export const ClientNewPage: Story = {
  render: () => <ClientNewPageComponent />,
}
