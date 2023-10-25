import { type SelectChangeEvent } from "@mui/material"
import { clientsGetAll, useClientList } from "feature/Clients"
import { useEffect } from "react"
import { useAppDispatch } from "store"
import {
  FormControl, InputLabel, MenuItem, Select,
} from "ui"

export type SelectClientProps = {
  label: string
  value: number | string
  handleChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void
  className?: string
}

export type TItems = {
  id: number | string
  value: number | string
  title?: string
}

export function SelectClient({
  label,
  value,
  handleChange,
  className,
}: SelectClientProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(clientsGetAll())
  }, [dispatch])

  const list = useClientList()

  return (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {list.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SelectClient.defaultProps = {
  className: "",
}
