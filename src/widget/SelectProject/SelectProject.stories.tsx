import type { Meta, StoryObj } from "@storybook/react"
import { SelectProject as SelectProjectComponent } from "./SelectProject"

const meta: Meta<typeof SelectProjectComponent> = {
  component: SelectProjectComponent,
}

export default meta
type Story = StoryObj<typeof SelectProjectComponent>

export const SelectProject: Story = {
  args: {},
  render: props => (<SelectProjectComponent {...props} />),
}
