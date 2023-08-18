import type { Meta, StoryObj } from "@storybook/react"
import { StoryWrap } from "common/story"
import { Link as LinkComponent } from "./Link"

const meta: Meta<typeof LinkComponent> = {
  component: LinkComponent,
  decorators: [StoryWrap],
}

export default meta
type Story = StoryObj<typeof LinkComponent>

export const Link: Story = {
  args: { underline: "hover", href: "/link" },
  render: props => (
    <>
      <LinkComponent {...props} color="primary">
        Link
      </LinkComponent>
      <LinkComponent {...props} color="secondary">
        Link
      </LinkComponent>
    </>
  ),
}
