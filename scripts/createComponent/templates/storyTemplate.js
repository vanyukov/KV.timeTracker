module.exports = (layer, componentName) => `import type { Meta, StoryObj } from "@storybook/react"
import { ${componentName} as ${componentName}Component } from "./${componentName}"

const meta: Meta<typeof ${componentName}Component> = {
  component: ${componentName}Component,
}

export default meta
type Story = StoryObj<typeof ${componentName}Component>

export const ${componentName}: Story = {
  args: {},
  render: props => (<${componentName}Component {...props} />),
}
`;
