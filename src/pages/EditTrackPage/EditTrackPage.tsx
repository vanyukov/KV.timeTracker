import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MainLayout } from "layout"
import { NotFound } from "pages/NotFound"
import { useAppDispatch } from "store"
import {
  type TTrack,
  TrackEditForm,
  tracksEditItem,
  useTrackById,
  tracksGet,
  useTrackListStatus,
} from "feature/Tracks"
import { makeDayLink } from "common/dateTime"
import { CircularProgress, Typography } from "ui"

export function EditTrackPage() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useTrackListStatus()
  const track = useTrackById(params.id ?? "")

  const handlerSave = useCallback(
    (tr: TTrack) => {
      void dispatch(tracksEditItem(tr))
      navigate(makeDayLink(tr.date))
    },
    [dispatch, navigate],
  )

  if (!track) {
    void dispatch(tracksGet(params.id ?? ""))

    if (status !== "succeeded") {
      return <CircularProgress />
    }
    return <NotFound />
  }

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Edit track
        </Typography>
        <TrackEditForm track={track} handleSave={handlerSave} />
      </div>
    </MainLayout>
  )
}
