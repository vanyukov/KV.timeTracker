import type { Meta, StoryObj } from "@storybook/react"
import { dateLib } from "common/dateTime"
import { Tracks as TracksComponent } from "./Tracks"

const meta: Meta<typeof TracksComponent> = {
  component: TracksComponent,
}

export default meta
type Story = StoryObj<typeof TracksComponent>

const dateStart = dateLib().startOf("day")
const dateEnd = dateStart.endOf("day")

export const Tracks: Story = {
  args: {
    dateStart,
    dateEnd,
  },
  render: props => <TracksComponent {...props} />,
}
