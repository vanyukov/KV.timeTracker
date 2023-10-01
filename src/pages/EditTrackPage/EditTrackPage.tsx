import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MainLayout } from "layout"
import { NotFound } from "pages/NotFound"
import { useAppDispatch } from "store"
import {
  type TTrack,
  TrackEditForm,
  tracksEdit,
  useTrackById,
} from "feature/Tracks"
import { makeDayLink } from "common/dateTime"

export function EditTrackPage() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const track = useTrackById(params.id ?? "")

  const handlerAddNew = useCallback(
    (tr: TTrack) => {
      void dispatch(tracksEdit(tr))
      navigate(makeDayLink(tr.date))
    },
    [dispatch, navigate],
  )

  if (!track) {
    return <NotFound />
  }

  return (
    <MainLayout>
      <div className="container">
        <TrackEditForm track={track} handleSave={handlerAddNew} />
      </div>
    </MainLayout>
  )
}
