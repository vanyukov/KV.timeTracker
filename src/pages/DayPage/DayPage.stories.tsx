import type { Meta, StoryObj } from "@storybook/react"
import { DayPage as DayPageComponent } from "./DayPage"

const meta: Meta<typeof DayPageComponent> = {
  component: DayPageComponent,
}

export default meta
type Story = StoryObj<typeof DayPageComponent>

export const DayPage: Story = {
  render: () => <DayPageComponent />,
}
