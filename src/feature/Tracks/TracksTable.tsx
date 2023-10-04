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
import style from "./TracksTable.module.scss"

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
            <TableCell>elapsed time</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(track => (
            <TableRow key={track.id} selected={track.active}>
              <TableCell>
                <p className="bold">{track.ticket}</p>
                <p className={style.ticketTitle}>{track.ticketTitle}</p>
              </TableCell>
              <TableCell>{getElapsedTimeFormat(track)}</TableCell>
              <TableCell>
                <Link href={`/track/${track.id}`}>
                  <Button color="secondary" size="small" variant="text">
                    <EditIcon />
                  </Button>
                </Link>
                <TrackSubMenu id={track.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
