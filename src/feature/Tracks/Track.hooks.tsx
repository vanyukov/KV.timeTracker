import { useAppSelector } from "store"

export function useTrackList() {
  return useAppSelector(state => state.tracks.items)
}

export function useTrackListStatus() {
  return useAppSelector(state => state.tracks.status)
}
