import type { Meta, StoryObj } from "@storybook/react"
import { TrackNewPage as TrackNewPageComponent } from "./TrackNewPage"

const meta: Meta<typeof TrackNewPageComponent> = {
  component: TrackNewPageComponent,
}

export default meta
type Story = StoryObj<typeof TrackNewPageComponent>

export const TrackNewPage: Story = {
  render: () => <TrackNewPageComponent />,
}
