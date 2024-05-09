import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "ui/Switch"
import { FormControlLabel as FormControlLabelComponent } from "./FormControlLabel"

const meta: Meta<typeof FormControlLabelComponent> = {
  component: FormControlLabelComponent,
}

export default meta
type Story = StoryObj<typeof FormControlLabelComponent>

export const FormControlLabel: Story = {
  args: {
    label: "FormControlLabel",
    control: <Switch defaultChecked />,
  },
  render: props => <FormControlLabelComponent {...props} />,
}
