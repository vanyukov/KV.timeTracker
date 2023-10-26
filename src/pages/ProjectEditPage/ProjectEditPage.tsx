import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MainLayout } from "layout"
import { NotFound } from "pages/NotFound"
import { useAppDispatch } from "store"
import {
  type TProject,
  ProjectEditForm,
  projectsEditItem,
  useProjectById,
  projectsGet,
  useProjectListStatus,
} from "feature/Projects"
import { CircularProgress, Typography } from "ui"

export function ProjectEditPage() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useProjectListStatus()
  const project = useProjectById(params.id ?? "")

  const handlerSave = useCallback(
    (tr: TProject) => {
      void dispatch(projectsEditItem(tr))
      navigate(-1)
    },
    [dispatch, navigate],
  )

  if (!project) {
    if (status === "succeeded") {
      return <NotFound />
    }
    void dispatch(projectsGet(params.id ?? ""))
  }

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Edit project
        </Typography>
        {project && status === "succeeded" ? (
          <ProjectEditForm project={project} handleSave={handlerSave} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </MainLayout>
  )
}
