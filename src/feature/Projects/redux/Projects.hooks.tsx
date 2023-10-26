import { useAppSelector } from "store"
import { selectAllProjects, selectProjectById } from "./Projects.slice"

export function useProjectList() {
  return useAppSelector(selectAllProjects)
}

export function useProjectById(id: string) {
  return useAppSelector(state => selectProjectById(state, id))
}

export function useProjectListStatus() {
  return useAppSelector(state => state.projects.status)
}
