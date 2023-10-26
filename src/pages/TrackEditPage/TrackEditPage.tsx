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
import { CircularProgress, Typography } from "ui"

export function TrackEditPage() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useTrackListStatus()
  const track = useTrackById(params.id ?? "")

  const handlerSave = useCallback(
    (tr: TTrack) => {
      void dispatch(tracksEditItem(tr))
      navigate(-1)
    },
    [dispatch, navigate],
  )

  if (!track) {
    if (status === "succeeded") {
      return <NotFound />
    }
    void dispatch(tracksGet(params.id ?? ""))
  }

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Edit track
        </Typography>
        {track && status === "succeeded" ? (
          <TrackEditForm track={track} handleSave={handlerSave} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </MainLayout>
  )
}
