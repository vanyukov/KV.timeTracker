import { TracksReducer } from "feature/Tracks/redux/Tracks.slice"
import { ClientsReducer } from "feature/Clients/redux/Clients.slice"

export const reducer = {
  tracks: TracksReducer,
  clients: ClientsReducer,
}
