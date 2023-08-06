import type { Meta, StoryObj } from "@storybook/react"
import { Link as LinkComponent } from "./Link"

const meta: Meta<typeof LinkComponent> = {
  component: LinkComponent,
}

export default meta
type Story = StoryObj<typeof LinkComponent>

export const Link: Story = {
  render: props => <LinkComponent {...props}>Link</LinkComponent>,
}
