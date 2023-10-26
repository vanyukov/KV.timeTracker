import type { Meta, StoryObj } from "@storybook/react"
import { ProjectEditPage as ProjectEditPageComponent } from "./ProjectEditPage"

const meta: Meta<typeof ProjectEditPageComponent> = {
  component: ProjectEditPageComponent,
}

export default meta
type Story = StoryObj<typeof ProjectEditPageComponent>

export const ProjectEditPage: Story = {
  render: () => <ProjectEditPageComponent />,
}
