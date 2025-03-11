import { useEffect, useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import {
  Button, Link, TableCell, TableRow,
} from "ui"
import { timeDiffSplitted, getTrackElapsedTime, dateLib } from "common/dateTime"
import classNames from "classnames"
import { TrackSubMenu } from "./TrackSubMenu"
import { BtnStartStopTrack } from "./BtnStartStopTrack"
import style from "./TracksRow.module.scss"
import { type TTrack } from "../types"
import { BtnDone } from "./BtnDone"

export type TracksRowProps = { track: TTrack, showDate?: boolean }

export function TracksRow({ track, showDate = false }: TracksRowProps) {
  const [timeView, setTimeView] = useState(
    timeDiffSplitted(0, 0, getTrackElapsedTime(track).valueOf()),
  )

  useEffect(() => {
    if (track.active) {
      const interval = setInterval(() => {
        setTimeView(timeDiffSplitted(0, 0, getTrackElapsedTime(track).valueOf()))
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
    return () => { }
  }, [track])

  return (
    <TableRow
      key={track.id}
      selected={Boolean(track.active)}
      className={classNames({ [style.done]: track.done })}
    >
      <TableCell>
        {showDate && <p className="pb12">{dateLib(track.date).format("DD.MM.YYYY")}</p>}
        <Link href={track.link} target="_blank">{track.ticket}</Link>
        <p className={style.ticketTitle}>{track.ticketTitle}</p>
      </TableCell>
      <TableCell>
        {`${timeView.hours}:${timeView.minutes}:${timeView.seconds}`}
      </TableCell>
      <TableCell>
        <BtnStartStopTrack track={track} />
        <BtnDone track={track} />
        <Link href={`/track/${track.id}`}>
          <Button color="secondary" size="small" variant="text">
            <EditIcon />
          </Button>
        </Link>
        <TrackSubMenu id={track.id} />
      </TableCell>
    </TableRow>
  )
}
