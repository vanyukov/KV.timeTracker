import { type TTrack } from "feature/Tracks"
import { timeDiffSplitted } from "./timeDiffSplitted"
import { dateLib } from "./dateLib"

export const getElapsedTimeFormat = (track: TTrack) => {
  const elapsedTime = timeDiffSplitted(
    dateLib(track.startTime).valueOf(),
    track.active ? dateLib().valueOf() : 0,
    track.elapsedTime,
  )
  return `${elapsedTime.hours}:${elapsedTime.minutes}`
}
