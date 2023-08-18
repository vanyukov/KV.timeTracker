import type { Meta, StoryObj } from "@storybook/react"
// eslint-disable-next-line import/no-extraneous-dependencies
import { reactRouterParameters } from "storybook-addon-react-router-v6"
import { Header as HeaderComponent } from "./Header"

const meta: Meta<typeof HeaderComponent> = {
  component: HeaderComponent,
}

export default meta
type Story = StoryObj<typeof HeaderComponent>

export const Header: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { year: "2023", month: "8", day: "17" },
      },
      routing: { path: "/day/:year/:month/:day" },
    }),
  },
  render: () => <HeaderComponent />,
}
