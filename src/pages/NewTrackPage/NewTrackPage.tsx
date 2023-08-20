import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "store"
import { makeDayLink } from "common/dateTime"
import { MainLayout } from "layout"
import {
  type TTrack,
  tracksAddNew,
  TrackEditForm,
  tracksDB,
} from "feature/Tracks"

export function NewTrackPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handlerAddNew = useCallback(
    (track: TTrack) => {
      void dispatch(tracksAddNew(track))
      navigate(makeDayLink(track.date))
    },
    [dispatch, navigate],
  )
  const track = tracksDB.getNew()

  return (
    <MainLayout>
      <div className="container">
        <TrackEditForm track={track} handleSave={handlerAddNew} />
      </div>
    </MainLayout>
  )
}
