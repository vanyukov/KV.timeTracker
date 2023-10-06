import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import { useAppDispatch } from "store"
import { Button } from "ui"
import {
  activeTracksStopItem,
  tracksEditItem,
  useTrackListStatus,
} from "../redux"
import { type TTrack } from "../types"

export function BtnStartStopTrack({ track }: { track: TTrack }) {
  const dispatch = useAppDispatch()
  const status = useTrackListStatus()

  const handleStart = () => {
    if (!track) {
      return
    }
    const savedTrack: TTrack = { ...track, active: 1 }
    void dispatch(tracksEditItem(savedTrack))
  }

  const handleStop = () => {
    void dispatch(activeTracksStopItem(track))
  }

  if (track.active) {
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

  return (
    <Button
      color="primary"
      disabled={status !== "succeeded"}
      onClick={handleStart}
    >
      <PlayArrowIcon />
    </Button>
  )
}
