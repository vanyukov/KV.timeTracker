import dayjs, { type Dayjs } from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
  weekStart: 1,
})
export const dateLib = dayjs
export type TdateLib = Dayjs
