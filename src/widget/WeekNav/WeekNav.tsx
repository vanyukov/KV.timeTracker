import classNames from "classnames"
import dayjs from "dayjs"
import { Link } from "ui"
import { weekDays } from "./weekDays"
import style from "./WeekNav.module.scss"

export type WeekNavProps = {
  className?: string
}

export function WeekNav({ className }: WeekNavProps) {
  const startWeek = dayjs().startOf("week")

  return (
    <div className={classNames(className, style.wrap)}>
      {weekDays.map(item => {
        const currentDay = startWeek.add(item.number, "day")
        return (
          <Link
            href={`/day/${currentDay.year()}/${currentDay.month()}/${currentDay.date()}`}
          >
            {item.title}
          </Link>
        )
      })}
    </div>
  )
}

WeekNav.defaultProps = {
  className: "",
}
