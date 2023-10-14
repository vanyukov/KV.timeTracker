import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "ui"
import { TracksRow } from "./TracksRow"
import { TracksTotal } from "./TracksTotal"
import { type TTrack } from "../types"

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
            <TracksRow track={track} key={track.id} />
          ))}
        </TableBody>
        <TracksTotal list={list} />
      </Table>
    </TableContainer>
  )
}
