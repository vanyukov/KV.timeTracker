export type TTrack = {
  id: string
  // boolean is not a valid key as index for IndexedDB
  active: 0 | 1
  date: string
  startTime: string
  elapsedTime: number
  ticket: string
  ticketTitle: string
  epic: string
  clientId: string
  comment: string
}
