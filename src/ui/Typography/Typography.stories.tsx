import type { Meta, StoryObj } from "@storybook/react"
import { Typography as TypographyComponent } from "./Typography"

const meta: Meta<typeof TypographyComponent> = {
  component: TypographyComponent,
}

export default meta
type Story = StoryObj<typeof TypographyComponent>

export const Typography: Story = {
  args: {
    align: "inherit",
    gutterBottom: true,
    noWrap: false,
  },
  render: props => (
    <>
      <TypographyComponent variant="h1" {...props}>
        h1. Heading
      </TypographyComponent>
      <TypographyComponent variant="h2" {...props}>
        h2. Heading
      </TypographyComponent>
      <TypographyComponent variant="h3" {...props}>
        h3. Heading
      </TypographyComponent>
      <TypographyComponent variant="h4" {...props}>
        h4. Heading
      </TypographyComponent>
      <TypographyComponent variant="h5" {...props}>
        h5. Heading
      </TypographyComponent>
      <TypographyComponent variant="h6" {...props}>
        h6. Heading
      </TypographyComponent>
      <TypographyComponent variant="subtitle1" {...props}>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </TypographyComponent>
      <TypographyComponent variant="subtitle2" {...props}>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </TypographyComponent>
      <TypographyComponent variant="body1" {...props}>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </TypographyComponent>
      <TypographyComponent variant="body2" {...props}>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </TypographyComponent>
      <TypographyComponent variant="button" display="block" {...props}>
        button text
      </TypographyComponent>
      <TypographyComponent variant="caption" display="block" {...props}>
        caption text
      </TypographyComponent>
      <TypographyComponent variant="overline" display="block" {...props}>
        overline text
      </TypographyComponent>
    </>
  ),
}
