import { useEffect } from "react"
import StopIcon from "@mui/icons-material/Stop"
import { useAppDispatch } from "store"
import { Button } from "ui"
import { activeTracksGetAll, activeTracksStopItem } from "./ActiveTracks.slice"
import { type TTrack } from "./types"
import { useTrackListStatus } from "./Tracks.hooks"

export function BtnStopTrack({ track }: { track: TTrack }) {
  const dispatch = useAppDispatch()
  const status = useTrackListStatus()

  useEffect(() => {
    void dispatch(activeTracksGetAll())
  }, [dispatch])

  const handleStop = () => {
    void dispatch(activeTracksStopItem(track))
  }

  return (
    <Button
      color="primary"
      disabled={status !== "succeeded"}
      onClick={handleStop}
    >
      <StopIcon />
    </Button>
  )
}
