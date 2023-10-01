import { IMaskInput } from "react-imask"
import { forwardRef, useState } from "react"
import { OutlinedInput, type OutlinedInputProps } from "ui/OutlinedInput"
import { FormControl, InputLabel } from "ui"

export type TextMaskCustomProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (event: { target: { name: string, value: string } }) => void
  // eslint-disable-next-line react/no-unused-prop-types
  name: string
}

const TextMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask="00:00"
        definitions={{
          "#": /[1-9]/,
        }}
        // @ts-expect-error
        inputRef={ref}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value } })
        }}
        overwrite
      />
    )
  },
)

export type TimeMaskInputProps = OutlinedInputProps & {
  label?: string
  onUpdate: (value: string) => void
}

export function TimeMaskInput({
  onUpdate,
  label,
  ...props
}: TimeMaskInputProps) {
  const [value, setValue] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onUpdate(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        value={value}
        label={label}
        {...props}
        onChange={handleChange}
        inputComponent={TextMaskCustom as any}
      />
    </FormControl>
  )
}

TimeMaskInput.defaultProps = {
  label: "",
}
