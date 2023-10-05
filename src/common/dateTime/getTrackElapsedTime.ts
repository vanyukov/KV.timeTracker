import { type TTrack } from "feature/Tracks"
import { dateLib } from "./dateLib"

export function getTrackElapsedTime(track: TTrack) {
  if (track.active) {
    return dateLib(
      dateLib().valueOf()
        - dateLib(track.startTime).valueOf()
        + track.elapsedTime,
    ).utc()
  }
  return dateLib(track.elapsedTime).utc()
}
