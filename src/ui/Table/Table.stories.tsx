import type { Meta, StoryObj } from "@storybook/react"
import { Table as TableComponent } from "./Table"

const meta: Meta<typeof TableComponent> = {
  component: TableComponent,
}

export default meta
type Story = StoryObj<typeof TableComponent>

export const Table: Story = {
  args: {},
  render: props => (<TableComponent {...props} />),
}
