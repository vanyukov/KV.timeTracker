import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import { Button, TextField } from "ui"
import { type TClient } from "../types"
import style from "./ClientEditForm.module.scss"
import { ClientSubMenu } from "./ClientSubMenu"

export type ClientEditFormProps = {
  client: TClient
  handleSave: (client: TClient) => void
  className?: string
}

export function ClientEditForm({
  client,
  handleSave,
  className,
}: ClientEditFormProps) {
  const [editClient, setEditClient] = useState({ ...client })
  const navigate = useNavigate()

  return (
    <div className={classNames(className, style.wrap)}>
      <div className="flex">
        <Button
          variant="contained"
          className="w100"
          onClick={() => {
            handleSave(editClient)
          }}
        >
          Save
        </Button>
        <ClientSubMenu
          id={client.id}
          onDelete={() => {
            navigate(-1)
          }}
        />
      </div>
      <div className={style.row}>
        <TextField value={client.id} disabled label="id" />
      </div>
      <div className={style.row}>
        <TextField
          value={editClient.name}
          label="name"
          onChange={event => {
            setEditClient({ ...editClient, name: event.target.value })
          }}
        />
      </div>
    </div>
  )
}
