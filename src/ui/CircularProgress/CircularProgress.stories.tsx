import type { Meta, StoryObj } from "@storybook/react"
import { CircularProgress as CircularProgressComponent } from "./CircularProgress"

const meta: Meta<typeof CircularProgressComponent> = {
  component: CircularProgressComponent,
}

export default meta
type Story = StoryObj<typeof CircularProgressComponent>

export const CircularProgress: Story = {
  args: {},
  render: props => (<CircularProgressComponent {...props} />),
}
