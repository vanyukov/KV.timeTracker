import type { Meta, StoryObj } from "@storybook/react"
import { MenuItem } from "ui/MenuItem"
import { FormControl } from "ui/FormControl"
import { InputLabel } from "ui/InputLabel"
import { Select as SelectComponent } from "./Select"

const meta: Meta<typeof SelectComponent> = {
  component: SelectComponent,
}

export default meta
type Story = StoryObj<typeof SelectComponent>

const list = [
  {
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 2,
  },
  {
    id: 3,
    name: 3,
  },
]
export const Select: Story = {
  args: {
    value: 1,
    label: "Select",
  },
  render: props => (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <SelectComponent {...props}>
        {list.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </SelectComponent>
    </FormControl>
  ),
}
