import { useEffect } from "react"
import { CircularProgress, Typography } from "ui"
import { useAppDispatch } from "store"
import style from "./Tracks.module.scss"
import { useTrackList, useTrackListStatus } from "./Track.hooks"
import { tracksGetAll } from "./Tracks.slice"

export type TracksProps = {
  className?: string
}

export function Tracks({ className }: TracksProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(tracksGetAll())
  }, [dispatch])

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
          {`${item.date} ${item.id}`}
        </div>
      ))}
    </div>
  )
}

Tracks.defaultProps = {
  className: "",
}
