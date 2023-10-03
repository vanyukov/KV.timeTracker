import { useState } from "react"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Button, Menu, MenuItem } from "ui"
import { useAppDispatch } from "store"
import { tracksDeleteItem } from "./Tracks.slice"

export type TrackSubMenuProps = {
  id: string
  onDelete?: () => void
}

export function TrackSubMenu({ id, onDelete = () => {} }: TrackSubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useAppDispatch()

  const handleDelete = () => {
    void dispatch(tracksDeleteItem(id))
    handleClose()
    onDelete()
  }
  return (
    <div>
      <Button onClick={handleClick} variant="text" color="secondary">
        <MoreHorizIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>
          <DeleteForeverIcon />
        </MenuItem>
      </Menu>
    </div>
  )
}
