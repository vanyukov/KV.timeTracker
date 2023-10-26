import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import { Button, TextField } from "ui"
import { SelectClient } from "widget"
import { type TProject } from "../types"
import style from "./ProjectEditForm.module.scss"
import { ProjectSubMenu } from "./ProjectSubMenu"

export type ProjectEditFormProps = {
  project: TProject
  handleSave: (project: TProject) => void
  className?: string
}

export function ProjectEditForm({
  project,
  handleSave,
  className,
}: ProjectEditFormProps) {
  const [editProject, setEditProject] = useState({ ...project })
  const navigate = useNavigate()

  return (
    <div className={classNames(className, style.wrap)}>
      <div className="flex">
        <Button
          variant="contained"
          className="w100"
          onClick={() => {
            handleSave(editProject)
          }}
        >
          Save
        </Button>
        <ProjectSubMenu
          id={project.id}
          onDelete={() => {
            navigate(-1)
          }}
        />
      </div>
      <div className={style.row}>
        <TextField value={project.id} disabled label="id" />
      </div>
      <div className={style.row}>
        <SelectClient
          value={editProject.clientId ?? ""}
          label="client"
          handleChange={event => {
            if (!event.target.value) {
              return
            }
            setEditProject({
              ...editProject,
              clientId: event.target.value as string,
            })
          }}
        />
      </div>
      <div className={style.row}>
        <TextField
          value={editProject.name}
          label="name"
          onChange={event => {
            setEditProject({ ...editProject, name: event.target.value })
          }}
        />
      </div>
    </div>
  )
}
