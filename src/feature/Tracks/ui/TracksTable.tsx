import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "ui"
import { dateLib } from "common/dateTime"
import { TracksRow } from "./TracksRow"
import { TracksTotal } from "./TracksTotal"
import { type TTrack } from "../types"

export type TracksTableProps = {
  list: TTrack[]
  showDate?: boolean
}
export function TracksTable({ list, showDate }: TracksTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell width="40%">ticket</TableCell>
            <TableCell width="20%">elapsed time</TableCell>
            <TableCell width="20%" />
          </TableRow>
        </TableHead>
        <TableBody>
          {list
            .sort((a, b) => (dateLib(b.date).unix() - dateLib(a.date).unix()))
            .map(track => (
              <TracksRow track={track} key={`${track.id}${track.elapsedTime}`} showDate={showDate} />
            ))}
          <TracksTotal list={list} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
