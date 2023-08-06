import type { Meta, StoryObj } from "@storybook/react"
import { MainPage as MainPageComponent } from "./MainPage"

const meta: Meta<typeof MainPageComponent> = {
  component: MainPageComponent,
}

export default meta
type Story = StoryObj<typeof MainPageComponent>

export const MainPage: Story = {
  render: props => (<MainPageComponent {...props} />),
}
