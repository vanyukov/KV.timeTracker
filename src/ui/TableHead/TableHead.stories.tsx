import type { Meta, StoryObj } from "@storybook/react"
import { TableHead as TableHeadComponent } from "./TableHead"

const meta: Meta<typeof TableHeadComponent> = {
  component: TableHeadComponent,
}

export default meta
type Story = StoryObj<typeof TableHeadComponent>

export const TableHead: Story = {
  args: {},
  render: props => (<TableHeadComponent {...props} />),
}
