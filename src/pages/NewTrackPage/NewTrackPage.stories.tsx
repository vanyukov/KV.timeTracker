import type { Meta, StoryObj } from "@storybook/react"
import { NewTrackPage as NewTrackPageComponent } from "./NewTrackPage"

const meta: Meta<typeof NewTrackPageComponent> = {
  component: NewTrackPageComponent,
}

export default meta
type Story = StoryObj<typeof NewTrackPageComponent>

export const NewTrackPage: Story = {
  render: () => <NewTrackPageComponent />,
}
