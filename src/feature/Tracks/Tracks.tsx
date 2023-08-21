import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "ui"
import { dateLib, timeDiffSplitted } from "common/dateTime"
import { useAppDispatch } from "store"
import { useTrackList, useTrackListStatus } from "./Tracks.hooks"
import { tracksGetAll } from "./Tracks.slice"
import { type TTrack } from "./types"
import style from "./Tracks.module.scss"

export type TracksProps = {
  className?: string
}

const getElapsedTimeFormat = (track: TTrack) => {
  const elapsedTime = timeDiffSplitted(
    dateLib(track.startTime).valueOf(),
    track.active ? dateLib().valueOf() : 0,
    track.elapsedTime,
  )
  return `${elapsedTime.hours}:${elapsedTime.minutes}`
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
      <Typography variant="h4" component="p" className="pt12">
        Today don&apos;t have tracks
      </Typography>
    )
  }
  return (
    <div className={className}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ticket</TableCell>
              <TableCell>ticket title</TableCell>
              <TableCell>elapsed time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <span>{row.ticket}</span>
                </TableCell>
                <TableCell>{row.ticketTitle}</TableCell>
                <TableCell>{getElapsedTimeFormat(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

Tracks.defaultProps = {
  className: "",
}
