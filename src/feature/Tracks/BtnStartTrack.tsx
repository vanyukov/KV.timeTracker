import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { useAppDispatch } from "store"
import { Button } from "ui"
import { tracksEditItem, useTrackListStatus } from "./redux"
import { type TTrack } from "./types"

export function BtnStartTrack({ track }: { track: TTrack }) {
  const dispatch = useAppDispatch()
  const status = useTrackListStatus()

  const handleStart = () => {
    if (!track) {
      return
    }
    const savedTrack: TTrack = { ...track, active: 1 }
    void dispatch(tracksEditItem(savedTrack))
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
