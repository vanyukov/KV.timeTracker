import type { Meta, StoryObj } from "@storybook/react"
import { ReportsPage as ReportsPageComponent } from "./ReportsPage"

const meta: Meta<typeof ReportsPageComponent> = {
  component: ReportsPageComponent,
}

export default meta
type Story = StoryObj<typeof ReportsPageComponent>

export const ReportsPage: Story = {
  render: () => <ReportsPageComponent />,
}
