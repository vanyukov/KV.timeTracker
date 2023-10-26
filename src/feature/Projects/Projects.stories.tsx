import type { Meta, StoryObj } from "@storybook/react"
import { Projects as ProjectsComponent } from "./Projects"

const meta: Meta<typeof ProjectsComponent> = {
  component: ProjectsComponent,
}

export default meta
type Story = StoryObj<typeof ProjectsComponent>

export const Projects: Story = {
  args: {},
  render: props => (<ProjectsComponent {...props} />),
}
