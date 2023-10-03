import type dayjs from "dayjs"
import * as MuiTimePicker from "@mui/x-date-pickers/TimePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

export type TimePickerProps = MuiTimePicker.TimePickerProps<dayjs.Dayjs>

export function TimePicker(props: TimePickerProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiTimePicker.TimePicker {...props} />
    </LocalizationProvider>
  )
}
