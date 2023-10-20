import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { MenuComponent } from "ui"
import { useAppDispatch } from "store"
import { tracksDeleteItem } from "../redux"

export type TrackSubMenuProps = {
  id: string
  onDelete?: () => void
}

export function TrackSubMenu({ id, onDelete = () => {} }: TrackSubMenuProps) {
  const dispatch = useAppDispatch()
  const handleDelete = () => {
    void dispatch(tracksDeleteItem(id))
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
