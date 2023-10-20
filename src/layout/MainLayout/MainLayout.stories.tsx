import type { Meta, StoryObj } from "@storybook/react"
import { MainLayout as MainLayoutComponent } from "./MainLayout"

const meta: Meta<typeof MainLayoutComponent> = {
  component: MainLayoutComponent,
}

export default meta
type Story = StoryObj<typeof MainLayoutComponent>

export const MainLayout: Story = {
  render: () => (
    <MainLayoutComponent>
      <div className="container">MainLayout content</div>
    </MainLayoutComponent>
  ),
}
