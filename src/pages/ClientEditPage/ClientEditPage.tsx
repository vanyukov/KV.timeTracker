import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MainLayout } from "layout"
import { NotFound } from "pages/NotFound"
import { useAppDispatch } from "store"
import {
  type TClient,
  ClientEditForm,
  clientsEditItem,
  useClientById,
  clientsGet,
  useClientListStatus,
} from "feature/Clients"
import { CircularProgress, Typography } from "ui"

export function ClientEditPage() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useClientListStatus()
  const client = useClientById(params.id ?? "")

  const handlerSave = useCallback(
    (tr: TClient) => {
      void dispatch(clientsEditItem(tr))
      navigate(-1)
    },
    [dispatch, navigate],
  )

  if (!client) {
    if (status === "succeeded") {
      return <NotFound />
    }
    void dispatch(clientsGet(params.id ?? ""))
  }

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Edit client
        </Typography>
        {client && status === "succeeded" ? (
          <ClientEditForm client={client} handleSave={handlerSave} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </MainLayout>
  )
}
