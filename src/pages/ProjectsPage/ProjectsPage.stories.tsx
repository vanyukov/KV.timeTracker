import type { Meta, StoryObj } from "@storybook/react"
import { ProjectsPage as ProjectsPageComponent } from "./ProjectsPage"

const meta: Meta<typeof ProjectsPageComponent> = {
  component: ProjectsPageComponent,
}

export default meta
type Story = StoryObj<typeof ProjectsPageComponent>

export const ProjectsPage: Story = {
  render: () => <ProjectsPageComponent />,
}
