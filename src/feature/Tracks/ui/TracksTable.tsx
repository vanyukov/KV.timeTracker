import { useEffect, useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TimePicker,
} from "ui"
import { timeDiffSplitted, getTrackElapsedTime } from "common/dateTime"
import { type TTrack } from "../types"
import { TrackSubMenu } from "./TrackSubMenu"
import { BtnStartStopTrack } from "./BtnStartStopTrack"
import style from "./TracksTable.module.scss"

function EmptyEl() {
  return <> </>
}

export type TracksTableProps = {
  list: TTrack[]
}
function getTotalTime(list: TTrack[]) {
  return list.reduce(
    (acc, track) => acc + getTrackElapsedTime(track).valueOf(),
    0,
  )
}

export function TracksTable({ list }: TracksTableProps) {
  const [totalTimeView, setTotalTimeView] = useState(
    timeDiffSplitted(0, 0, getTotalTime(list)),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTimeView(timeDiffSplitted(0, 0, getTotalTime(list)))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [list])

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>ticket</TableCell>
            <TableCell>elapsed time</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(track => (
            <TableRow key={track.id} selected={Boolean(track.active)}>
              <TableCell>
                <p className="bold">{track.ticket}</p>
                <p className={style.ticketTitle}>{track.ticketTitle}</p>
              </TableCell>
              <TableCell>
                <TimePicker
                  value={getTrackElapsedTime(track)}
                  views={["hours", "minutes", "seconds"]}
                  ampm={false}
                  readOnly
                  slots={{
                    openPickerButton: EmptyEl,
                  }}
                  sx={{
                    ".MuiInputBase-root": {
                      paddingRight: 0,
                    },
                  }}
                />
              </TableCell>
              <TableCell>
                <BtnStartStopTrack track={track} />
                <Link href={`/track/${track.id}`}>
                  <Button color="secondary" size="small" variant="text">
                    <EditIcon />
                  </Button>
                </Link>
                <TrackSubMenu id={track.id} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1} size="medium" sx={{ fontWeight: "bold" }}>
              Total
            </TableCell>
            <TableCell align="center">
              {`${totalTimeView.hours}:${totalTimeView.minutes}:${totalTimeView.seconds}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
