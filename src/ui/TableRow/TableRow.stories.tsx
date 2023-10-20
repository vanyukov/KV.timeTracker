import type { Meta, StoryObj } from "@storybook/react"
import { TableRow as TableRowComponent } from "./TableRow"

const meta: Meta<typeof TableRowComponent> = {
  component: TableRowComponent,
}

export default meta
type Story = StoryObj<typeof TableRowComponent>

export const TableRow: Story = {
  args: {},
  render: props => (<TableRowComponent {...props} />),
}
