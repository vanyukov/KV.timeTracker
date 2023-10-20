import { createListenerMiddleware } from "@reduxjs/toolkit"
import { type RootState } from "store"
import {
  tracksStopOther,
  tracksEditItem,
  tracksGet,
  tracksAddNew,
} from "./Tracks.slice"

export const changeTrackActivityListenerMiddleware = createListenerMiddleware()

changeTrackActivityListenerMiddleware.startListening({
  predicate: action => (
    [
      tracksEditItem.fulfilled.type,
      tracksAddNew.fulfilled.type,
    ]
      .includes(
        action.type,
      )
  ),
  effect: async (action, listenerApi) => {
    if (action.payload.active) {
      const list = (await listenerApi.dispatch(
        tracksStopOther(action.payload),
      )) as { payload: [string] }

      const state = listenerApi.getState() as RootState
      list.payload.forEach(id => {
        if (state.tracks.ids.includes(id)) {
          void listenerApi.dispatch(tracksGet(id))
        }
      })
    }
  },
})
