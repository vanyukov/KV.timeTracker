import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "store"
import { MainLayout } from "layout"
import {
  type TClient,
  clientsAddNew,
  ClientEditForm,
  clientsDB,
} from "feature/Clients"
import { Typography } from "ui"

export function ClientNewPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handlerAddNew = useCallback(
    (client: TClient) => {
      void dispatch(clientsAddNew(client))
      navigate(-1)
    },
    [dispatch, navigate],
  )
  const client = clientsDB.getNew()

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Add new client
        </Typography>
        <ClientEditForm client={client} handleSave={handlerAddNew} />
      </div>
    </MainLayout>
  )
}
