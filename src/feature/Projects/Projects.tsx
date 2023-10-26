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
import { clientsGetAll } from "feature/Clients"
import { projectsGetAll, useProjectList, useProjectListStatus } from "./redux"
import { ProjectTableRow } from "./ui"
import style from "./Projects.module.scss"

export type ProjectsProps = {
  className?: string
}

export function Projects({ className }: ProjectsProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(projectsGetAll())
    void dispatch(clientsGetAll())
  }, [dispatch])

  const list = useProjectList()
  const status = useProjectListStatus()

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
        Don&apos;t have projects
      </Typography>
    )
  }
  return (
    <div className={className}>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell width="40%">Client</TableCell>
              <TableCell width="40%">Project</TableCell>
              <TableCell />
            </TableRow>
            <TableRow />
          </TableHead>
          <TableBody>
            {list.map(item => (
              <ProjectTableRow item={item} key={item.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
