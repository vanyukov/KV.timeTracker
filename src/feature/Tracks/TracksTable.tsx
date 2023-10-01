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
} from "ui"
import { dateLib, timeDiffSplitted } from "common/dateTime"
import { type TTrack } from "./types"

export type TracksTableProps = {
  list: TTrack[]
}

const getElapsedTimeFormat = (track: TTrack) => {
  const elapsedTime = timeDiffSplitted(
    dateLib(track.startTime).valueOf(),
    track.active ? dateLib().valueOf() : 0,
    track.elapsedTime,
  )
  return `${elapsedTime.hours}:${elapsedTime.minutes}`
}

export function TracksTable({ list }: TracksTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>ticket</TableCell>
            <TableCell>ticket title</TableCell>
            <TableCell>elapsed time</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(track => (
            <TableRow key={track.id}>
              <TableCell>
                <span>{track.ticket}</span>
              </TableCell>
              <TableCell>{track.ticketTitle}</TableCell>
              <TableCell>{getElapsedTimeFormat(track)}</TableCell>
              <TableCell>
                <Link href={`/track/${track.id}`}>
                  <Button color="secondary" size="small" variant="text">
                    <EditIcon />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
