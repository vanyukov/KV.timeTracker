import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import { useAppDispatch } from "store"
import { Button } from "ui"
import { tracksStartStopItem, useTrackListStatus } from "../redux"
import { type TTrack } from "../types"

export function BtnStartStopTrack({ track }: { track: TTrack }) {
  const dispatch = useAppDispatch()
  const status = useTrackListStatus()

  const handleAction = () => {
    const savedTrack: TTrack = { ...track, active: track.active ? 0 : 1 }
    void dispatch(tracksStartStopItem(savedTrack))
  }

  return (
    <Button
      color="primary"
      disabled={status !== "succeeded"}
      onClick={handleAction}
    >
      {track.active ? <StopIcon /> : <PlayArrowIcon />}
    </Button>
  )
}
