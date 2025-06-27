import { TracksReducer } from "feature/Tracks/redux/Tracks.slice"
import { ClientsReducer } from "feature/Clients/redux/Clients.slice"
import { ProjectsReducer } from "feature/Projects/redux/Projects.slice"
import { AuthReducer } from "feature/Auth/redux/Auth.slice"

export const reducer = {
  tracks: TracksReducer,
  clients: ClientsReducer,
  projects: ProjectsReducer,
  auth: AuthReducer,
}
