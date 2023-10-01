import { useAppSelector } from "store"
import { selectAllTracks, selectTrackById } from "./Tracks.slice"

export function useTrackList() {
  return useAppSelector(selectAllTracks)
}

export function useTrackById(id: string) {
  return useAppSelector(state => selectTrackById(state, id))
}

export function useTrackListStatus() {
  return useAppSelector(state => state.tracks.status)
}
