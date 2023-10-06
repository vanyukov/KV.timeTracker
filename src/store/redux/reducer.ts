import { TracksReducer } from "feature/Tracks/redux/Tracks.slice"
import { ActiveTracksReducer } from "feature/Tracks/redux/ActiveTracks.slice"

export const reducer = {
  tracks: TracksReducer,
  activeTracks: ActiveTracksReducer,
}
