import * as React from "react"
import { Button, Menu, MenuItem } from "ui"

export type MenuComponentProps = {
  title: React.ReactElement | string
  items: Array<{
    id: string | number
    title: React.ReactElement | string
    fn?: () => void
  }>
  className?: string
}

export function MenuComponent({
  title,
  items,
  className = "",
}: MenuComponentProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={className}>
      <Button onClick={handleClick} variant="text" color="secondary">
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map(item => (
          <MenuItem
            key={item.id}
            onClick={() => {
              item.fn?.()
              handleClose()
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
