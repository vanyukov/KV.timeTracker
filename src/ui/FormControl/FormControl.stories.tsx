import type { Meta, StoryObj } from "@storybook/react"
import { InputLabel } from "ui/InputLabel"
import { Input } from "ui/Input"
import { FormControl as FormControlComponent } from "./FormControl"

const meta: Meta<typeof FormControlComponent> = {
  component: FormControlComponent,
}

export default meta
type Story = StoryObj<typeof FormControlComponent>

export const FormControl: Story = {
  args: {},
  render: props => (
    <FormControlComponent {...props}>
      <InputLabel htmlFor="my-input">Email address</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
    </FormControlComponent>
  ),
}
