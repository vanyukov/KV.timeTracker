import type { Meta, StoryObj } from "@storybook/react"
import { Tracks as TracksComponent } from "./Tracks"

const meta: Meta<typeof TracksComponent> = {
  component: TracksComponent,
}

export default meta
type Story = StoryObj<typeof TracksComponent>

export const Tracks: Story = {
  args: {},
  render: props => (<TracksComponent {...props} />),
}
