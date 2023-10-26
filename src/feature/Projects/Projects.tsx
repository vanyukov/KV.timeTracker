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
import { projectsGetAll, useProjectList, useProjectListStatus } from "./redux"
import { ProjectSubMenu } from "./ui"
import style from "./Projects.module.scss"

export type ProjectsProps = {
  className?: string
}

export function Projects({ className }: ProjectsProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(projectsGetAll())
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
              <TableCell width="40%">Project</TableCell>
              <TableCell width="40%">Title</TableCell>
              <TableCell />
            </TableRow>
            <TableRow />
          </TableHead>
          <TableBody>
            {list.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Link href={`/projects/${item.id}`}>
                    <Button color="secondary" size="small" variant="text">
                      <EditIcon />
                    </Button>
                  </Link>
                  <ProjectSubMenu id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
