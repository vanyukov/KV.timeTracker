import dayjs, { type Dayjs } from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
  weekStart: 1,
})
dayjs.extend(utc)
dayjs.extend(timezone)

export const dateLib = dayjs
export type TdateLib = Dayjs
