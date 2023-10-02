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
import { getElapsedTimeFormat } from "common/dateTime"
import { type TTrack } from "./types"
import { TrackSubMenu } from "./TrackSubMenu"

export type TracksTableProps = {
  list: TTrack[]
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
            <TableRow key={track.id} selected={track.active}>
              <TableCell>
                <span>{track.ticket}</span>
              </TableCell>
              <TableCell>{track.ticketTitle}</TableCell>
              <TableCell>{getElapsedTimeFormat(track)}</TableCell>
              <TableCell>
                <div className="flex">
                  <Link href={`/track/${track.id}`}>
                    <Button color="secondary" size="small" variant="text">
                      <EditIcon />
                    </Button>
                  </Link>
                  <TrackSubMenu id={track.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
