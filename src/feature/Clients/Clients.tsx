import { useEffect } from "react"
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
import { useAppDispatch } from "store"
import { clientsGetAll, useClientList, useClientListStatus } from "./redux"
import style from "./Clients.module.scss"

export type ClientsProps = {
  className?: string
}

export function Clients({ className }: ClientsProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(clientsGetAll())
  }, [dispatch])

  const list = useClientList()
  const status = useClientListStatus()

  if (status === "idle" || (!list.length && status === "pending")) {
    return (
      <div className={style.circularProgress}>
        <CircularProgress />
      </div>
    )
  }

  if (!list.length) {
    return (
      <Typography variant="h5" component="p" className="pt12">
        Don&apos;t have clients
      </Typography>
    )
  }
  return (
    <div className={className}>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell width="100%">title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(item => (
              <TableCell>{item.name}</TableCell>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
