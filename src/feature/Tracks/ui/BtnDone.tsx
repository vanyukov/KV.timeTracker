import { useAppDispatch } from "store"
import { Checkbox, FormControlLabel } from "ui"
import { tracksStartStopItem } from "../redux"
import { type TTrack } from "../types"

export function BtnDone({ track }: { track: TTrack }) {
  const dispatch = useAppDispatch()

  const handleAction = () => {
    const savedTrack: TTrack = { ...track, done: track.done ? 0 : 1 }
    void dispatch(tracksStartStopItem(savedTrack))
    if (savedTrack.active && savedTrack.done) {
      savedTrack.active = 0
      void dispatch(tracksStartStopItem(savedTrack))
    }
  }

  return (
    <FormControlLabel
      className="pt12"
      control={<Checkbox checked={Boolean(track.done)} onClick={handleAction} />}
      label="done"
    />
  )
}
