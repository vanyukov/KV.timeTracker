import type { Meta, StoryObj } from "@storybook/react"
import { Paper as PaperComponent } from "./Paper"

const meta: Meta<typeof PaperComponent> = {
  component: PaperComponent,
}

export default meta
type Story = StoryObj<typeof PaperComponent>

export const Paper: Story = {
  args: {},
  render: props => (<PaperComponent {...props} />),
}
