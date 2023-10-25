import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { MenuComponent } from "ui"
import { useAppDispatch } from "store"
import { clientsDeleteItem } from "../redux"

export type ClientSubMenuProps = {
  id: string
  onDelete?: () => void
}

export function ClientSubMenu({ id, onDelete = () => {} }: ClientSubMenuProps) {
  const dispatch = useAppDispatch()
  const handleDelete = () => {
    void dispatch(clientsDeleteItem(id))
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
