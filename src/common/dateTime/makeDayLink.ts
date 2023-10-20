import { dateLib, type TdateLib } from "./dateLib"

export function makeDayLink(date: string | number | TdateLib | Date) {
  return `/day/${dateLib(date).format("YYYY/M/D")}`
}
