import type { Meta, StoryObj } from "@storybook/react"
import { NotFound as NotFoundComponent } from "./NotFound"

const meta: Meta<typeof NotFoundComponent> = {
  component: NotFoundComponent,
}

export default meta
type Story = StoryObj<typeof NotFoundComponent>

export const NotFound: Story = {
  render: props => (<NotFoundComponent />),
}
