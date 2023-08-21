import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { CircularProgress, Typography } from "ui"
import { type TdateLib, dateLib } from "common/dateTime"
import { useAppDispatch } from "store"
import { useTrackList, useTrackListStatus } from "./Tracks.hooks"
import { tracksGetAll } from "./Tracks.slice"
import style from "./Tracks.module.scss"

export type TracksProps = {
  className?: string
}

export function Tracks({ className }: TracksProps) {
  const params = useParams()
  let dateStart: TdateLib
  if (!params.day || !params.month || !params.year) {
    dateStart = dateLib().startOf("day")
  } else {
    dateStart = dateLib(`${params.year}-${params.month}-${params.day}`)
  }

  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(
      tracksGetAll({
        dateStart: dateStart.toISOString(),
        dateEnd: dateStart.endOf("day").toISOString(),
      }),
    )
  }, [dateStart, dispatch])

  const list = useTrackList()
  const status = useTrackListStatus()

  if (["pending", "idle"].includes(status)) {
    return (
      <div className={style.circularProgress}>
        <CircularProgress />
      </div>
    )
  }

  if (!list.length) {
    return (
      <Typography variant="h4" component="p" className="pt12">
        Today don&apos;t have tracks
      </Typography>
    )
  }
  return (
    <div className={className}>
      {list.map(item => (
        <div className="" key={item.id}>
          {`${dateLib(item.date).format("DD MM")} - ${item.ticket} - ${item.id}`}
        </div>
      ))}
    </div>
  )
}

Tracks.defaultProps = {
  className: "",
}
