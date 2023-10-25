import { useEffect } from "react"
import EditIcon from "@mui/icons-material/Edit"
import {
  Button,
  CircularProgress,
  Link,
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
import { ClientSubMenu } from "./ui"

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
              <TableCell width="80%">title</TableCell>
              <TableCell />
            </TableRow>
            <TableRow />
          </TableHead>
          <TableBody>
            {list.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Link href={`/clients/${item.id}`}>
                    <Button color="secondary" size="small" variant="text">
                      <EditIcon />
                    </Button>
                  </Link>
                  <ClientSubMenu id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
