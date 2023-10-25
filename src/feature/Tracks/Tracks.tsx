import { useEffect } from "react"
import { CircularProgress, Typography } from "ui"
import { useAppDispatch } from "store"
import { type TdateLib } from "common/dateTime"
import { useTrackList, useTrackListStatus, tracksGetAll } from "./redux"
import { TracksTable } from "./ui/TracksTable"
import style from "./Tracks.module.scss"

export type TracksProps = {
  dateStart: TdateLib
  dateEnd: TdateLib
  className?: string
  showDate?: boolean
}

export function Tracks({
  className,
  dateStart,
  dateEnd,
  showDate,
}: TracksProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(
      tracksGetAll({
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.endOf("day").toISOString(),
      }),
    )
  }, [dateEnd, dateStart, dispatch])

  const list = useTrackList()
  const status = useTrackListStatus()

  if (status === "idle" || (!list.length && status === "pending")) {
    return (
      <div className={style.circularProgress}>
        <CircularProgress />
      </div>
    )
  }

  if (!list.length) {
    return (
      <Typography variant="h5" component="p" className="pt12">
        Don&apos;t have tracks
      </Typography>
    )
  }
  return (
    <div className={className}>
      <TracksTable list={list} showDate={showDate} />
    </div>
  )
}

Tracks.defaultProps = {
  className: "",
}
