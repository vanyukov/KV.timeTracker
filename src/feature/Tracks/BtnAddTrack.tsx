import { useAppDispatch } from "store"
import { Button } from "ui"
import { tracksAddNew } from "./Tracks.slice"

export function BtnAddTrack() {
  const dispatch = useAppDispatch()

  const handlerAddNew = () => {
    void dispatch(tracksAddNew())
  }

  return (
    <Button color="success" onClick={handlerAddNew}>
      Add Track
    </Button>
  )
}
