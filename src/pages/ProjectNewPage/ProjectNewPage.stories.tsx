import type { Meta, StoryObj } from "@storybook/react"
import { ProjectNewPage as ProjectNewPageComponent } from "./ProjectNewPage"

const meta: Meta<typeof ProjectNewPageComponent> = {
  component: ProjectNewPageComponent,
}

export default meta
type Story = StoryObj<typeof ProjectNewPageComponent>

export const ProjectNewPage: Story = {
  render: () => <ProjectNewPageComponent />,
}
