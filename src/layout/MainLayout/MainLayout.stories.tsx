import type { Meta, StoryObj } from "@storybook/react"
// eslint-disable-next-line import/no-extraneous-dependencies
import { reactRouterParameters } from "storybook-addon-react-router-v6"
import { MainLayout as MainLayoutComponent } from "./MainLayout"

const meta: Meta<typeof MainLayoutComponent> = {
  component: MainLayoutComponent,
}

export default meta
type Story = StoryObj<typeof MainLayoutComponent>

export const MainLayout: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { year: "2023", month: "8", day: "17" },
      },
      routing: { path: "/day/:year/:month/:day" },
    }),
  },
  render: () => (
    <div className="w100">
      <MainLayoutComponent>
        <div className="container">MainLayout content</div>
      </MainLayoutComponent>
    </div>
  ),
}
