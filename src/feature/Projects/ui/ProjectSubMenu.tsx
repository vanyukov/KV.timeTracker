import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { MenuComponent } from "ui"
import { useAppDispatch } from "store"
import { projectsDeleteItem } from "../redux"

export type ProjectSubMenuProps = {
  id: string
  onDelete?: () => void
}

export function ProjectSubMenu({ id, onDelete = () => {} }: ProjectSubMenuProps) {
  const dispatch = useAppDispatch()
  const handleDelete = () => {
    void dispatch(projectsDeleteItem(id))
    onDelete()
  }

  const menuItems = [
    {
      id: 1,
      title: <DeleteForeverIcon />,
      fn: handleDelete,
    },
  ]
  return <MenuComponent title={<MoreHorizIcon />} items={menuItems} />
}
