import { useAppSelector } from "store"
import { selectAllTracks, selectTrackById } from "./Tracks.slice"
import { selectActiveTrackById, selectAllActiveTracks } from "./ActiveTracks.slice"

export function useTrackList() {
  return useAppSelector(selectAllTracks)
}

export function useTrackById(id: string) {
  return useAppSelector(state => selectTrackById(state, id))
}

export function useTrackListStatus() {
  return useAppSelector(state => state.tracks.status)
}

export function useActiveTrackList() {
  return useAppSelector(selectAllActiveTracks)
}

export function useActiveTrackById(id: string) {
  return useAppSelector(state => selectActiveTrackById(state, id))
}

export function useActiveTrackListStatus() {
  return useAppSelector(state => state.activeTracks.status)
}
