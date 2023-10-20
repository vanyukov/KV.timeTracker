import classNames from "classnames"
import { useParams } from "react-router-dom"
import { Link, Typography } from "ui"
import { useActiveDay } from "common/helpers"
import { dateLib, makeDayLink } from "common/dateTime"
import { weekDays } from "./weekDays"
import style from "./WeekNav.module.scss"

export type WeekNavProps = {
  className?: string
}

export function WeekNav({ className }: WeekNavProps) {
  const params = useParams()
  const day = (params.year
      && params.month
      && params.day
      && `${params.year}-${+params.month}-${params.day}`)
    ?? undefined

  const startWeek = dateLib().startOf("week")
  const activeDay = useActiveDay()
  const today = dateLib().format("D M YYYY")

  return (
    <>
      <Typography variant="h6" component="p" className="pb12">
        {dateLib(day).format("DD MMMM YYYY, dddd")}
      </Typography>

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
            : makeDayLink(currentDay)

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
    </>
  )
}

WeekNav.defaultProps = {
  className: "",
}
