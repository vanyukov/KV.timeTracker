import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { CircularProgress, Typography } from "ui"
import { dateLib } from "common/dateTime"
import { useAppDispatch } from "store"
import { useTrackList, useTrackListStatus } from "./Tracks.hooks"
import { tracksGetAll } from "./Tracks.slice"
import { TracksTable } from "./TracksTable"
import style from "./Tracks.module.scss"

export type TracksProps = {
  className?: string
}

export function Tracks({ className }: TracksProps) {
  const params = useParams()
  let dateStart: string
  if (!params.day || !params.month || !params.year) {
    dateStart = dateLib().startOf("day").toISOString()
  } else {
    dateStart = dateLib(
      `${params.year}-${params.month}-${params.day}`,
    ).toISOString()
  }

  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(
      tracksGetAll({
        dateStart,
        dateEnd: dateLib(dateStart).endOf("day").toISOString(),
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
      <Typography variant="h5" component="p" className="pt12">
        Today don&apos;t have tracks
      </Typography>
    )
  }
  return (
    <div className={className}>
      <TracksTable list={list} />
    </div>
  )
}

Tracks.defaultProps = {
  className: "",
}
