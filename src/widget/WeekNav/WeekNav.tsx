import classNames from "classnames"
import dayjs from "dayjs"
import { Link, Typography } from "ui"
import { useActiveDay } from "common/helpers"
import { weekDays } from "./weekDays"
import style from "./WeekNav.module.scss"

export type WeekNavProps = {
  className?: string
}

export function WeekNav({ className }: WeekNavProps) {
  const startWeek = dayjs().startOf("week")
  const activeDay = useActiveDay()
  const today = dayjs().format("D M YYYY")

  return (
    <div className={classNames("flex g12", className)}>
      {weekDays.map(item => {
        const currentDay = startWeek.add(item, "day")

        if (activeDay === currentDay.format("D M YYYY")) {
          return (
            <Typography
              key={item}
              variant="button"
              className={classNames("flex", style.link)}
            >
              <span>{currentDay.format("ddd")}</span>
              <span>{currentDay.format("DD")}</span>
            </Typography>
          )
        }

        const link = today === currentDay.format("D M YYYY")
          ? "/"
          : `/day/${currentDay.format("YYYY/M/D")}`

        return (
          <Link
            key={item}
            href={link}
            variant="button"
            className={classNames("flex", style.link)}
          >
            <span>{currentDay.format("ddd")}</span>
            <span>{currentDay.format("DD")}</span>
          </Link>
        )
      })}
    </div>
  )
}

WeekNav.defaultProps = {
  className: "",
}
