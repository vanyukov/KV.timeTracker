import type { Meta, StoryObj } from "@storybook/react"
import { TableContainer as TableContainerComponent } from "./TableContainer"

const meta: Meta<typeof TableContainerComponent> = {
  component: TableContainerComponent,
}

export default meta
type Story = StoryObj<typeof TableContainerComponent>

export const TableContainer: Story = {
  args: {},
  render: props => (<TableContainerComponent {...props} />),
}
