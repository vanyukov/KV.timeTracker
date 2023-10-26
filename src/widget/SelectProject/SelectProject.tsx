import { type SelectChangeEvent } from "@mui/material"
import { projectsGetAll, useProjectList } from "feature/Projects"
import { useEffect } from "react"
import { useAppDispatch } from "store"
import {
  FormControl, InputLabel, MenuItem, Select,
} from "ui"

export type SelectProjectProps = {
  label: string
  value: string
  clientId?: string
  handleChange: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode,
  ) => void
  className?: string
}

export type TItems = {
  id: string
  value: string
  clientId: string
  title?: string
}

export function SelectProject({
  label,
  value,
  clientId,
  handleChange,
  className,
}: SelectProjectProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(projectsGetAll())
  }, [dispatch])

  const list = useProjectList().filter(item => item.clientId === clientId)

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

SelectProject.defaultProps = {
  className: "",
}
