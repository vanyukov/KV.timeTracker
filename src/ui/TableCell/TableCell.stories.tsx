import type { Meta, StoryObj } from "@storybook/react"
import { TableCell as TableCellComponent } from "./TableCell"

const meta: Meta<typeof TableCellComponent> = {
  component: TableCellComponent,
}

export default meta
type Story = StoryObj<typeof TableCellComponent>

export const TableCell: Story = {
  args: {},
  render: props => (<TableCellComponent {...props} />),
}
