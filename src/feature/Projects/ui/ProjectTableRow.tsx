import EditIcon from "@mui/icons-material/Edit"
import {
  TableRow, TableCell, Button, Link,
} from "ui"
import { useClientById } from "feature/Clients"
import { type TProject } from "../types"
import { ProjectSubMenu } from "./ProjectSubMenu"

export type ProjectTableRowProps = {
  item: TProject
}
export function ProjectTableRow({ item }: ProjectTableRowProps) {
  const client = useClientById(item.clientId ?? "")
  return (
    <TableRow>
      <TableCell>{client?.name}</TableCell>
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
  )
}
