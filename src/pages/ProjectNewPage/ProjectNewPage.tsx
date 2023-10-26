import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "store"
import { MainLayout } from "layout"
import {
  type TProject,
  projectsAddNew,
  ProjectEditForm,
  projectsDB,
} from "feature/Projects"
import { Typography } from "ui"

export function ProjectNewPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handlerAddNew = useCallback(
    (project: TProject) => {
      void dispatch(projectsAddNew(project))
      navigate(-1)
    },
    [dispatch, navigate],
  )
  const project = projectsDB.getNew()

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Add new project
        </Typography>
        <ProjectEditForm project={project} handleSave={handlerAddNew} />
      </div>
    </MainLayout>
  )
}
