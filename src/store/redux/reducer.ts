import { TracksReducer } from "feature/Tracks/Tracks.slice"
import { ActiveTracksReducer } from "feature/Tracks/ActiveTracks.slice"

export const reducer = {
  tracks: TracksReducer,
  activeTracks: ActiveTracksReducer,
}
