import type { Meta, StoryObj } from "@storybook/react"
import { TracksByPeriod as TracksByPeriodComponent } from "./TracksByPeriod"

const meta: Meta<typeof TracksByPeriodComponent> = {
  component: TracksByPeriodComponent,
}

export default meta
type Story = StoryObj<typeof TracksByPeriodComponent>

export const TracksByPeriod: Story = {
  render: () => <TracksByPeriodComponent />,
}
