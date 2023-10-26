import type { Meta, StoryObj } from "@storybook/react"
import { TrackEditPage as TrackEditPageComponent } from "./TrackEditPage"

const meta: Meta<typeof TrackEditPageComponent> = {
  component: TrackEditPageComponent,
}

export default meta
type Story = StoryObj<typeof TrackEditPageComponent>

export const TrackEditPage: Story = {
  render: () => <TrackEditPageComponent />,
}
