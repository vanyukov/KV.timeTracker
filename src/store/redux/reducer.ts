import { TracksReducer } from "feature/Tracks/redux/Tracks.slice"
import { ClientsReducer } from "feature/Clients/redux/Clients.slice"
import { ProjectsReducer } from "feature/Projects/redux/Projects.slice"

export const reducer = {
  tracks: TracksReducer,
  clients: ClientsReducer,
  projects: ProjectsReducer,
}
