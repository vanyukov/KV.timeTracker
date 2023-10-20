import type { Meta, StoryObj } from "@storybook/react"
import { WeekNav as WeekNavComponent } from "./WeekNav"

const meta: Meta<typeof WeekNavComponent> = {
  component: WeekNavComponent,
}

export default meta
type Story = StoryObj<typeof WeekNavComponent>

export const WeekNav: Story = {
  render: props => (<WeekNavComponent {...props} />),
}
