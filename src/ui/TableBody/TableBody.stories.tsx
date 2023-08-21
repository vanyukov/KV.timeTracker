import type { Meta, StoryObj } from "@storybook/react"
import { TableBody as TableBodyComponent } from "./TableBody"

const meta: Meta<typeof TableBodyComponent> = {
  component: TableBodyComponent,
}

export default meta
type Story = StoryObj<typeof TableBodyComponent>

export const TableBody: Story = {
  args: {},
  render: props => (<TableBodyComponent {...props} />),
}
