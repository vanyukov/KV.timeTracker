import type { Meta, StoryObj } from "@storybook/react"
import { EditTrackPage as EditTrackPageComponent } from "./EditTrackPage"

const meta: Meta<typeof EditTrackPageComponent> = {
  component: EditTrackPageComponent,
}

export default meta
type Story = StoryObj<typeof EditTrackPageComponent>

export const EditTrackPage: Story = {
  render: () => <EditTrackPageComponent />,
}
