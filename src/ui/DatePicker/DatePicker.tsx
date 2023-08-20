import type dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import * as DatePickerMui from "@mui/x-date-pickers/DatePicker"
import "dayjs/locale/en-gb"

export type DatePickerProps = DatePickerMui.DatePickerProps<dayjs.Dayjs>

export function DatePicker(props: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <DatePickerMui.DatePicker format="DD.MM.YYYY" {...props} />
    </LocalizationProvider>
  )
}
