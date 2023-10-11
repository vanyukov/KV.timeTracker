import { createListenerMiddleware } from "@reduxjs/toolkit"
import { dateLib, getTrackElapsedTime, time2359 } from "common/dateTime"
import {
  tracksGetAll,
  tracksGet,
  tracksEditItem,
} from "./Tracks.slice"
import { type TTrack } from "../types"

export const maxTimeListenerMiddleware = createListenerMiddleware()

maxTimeListenerMiddleware.startListening({
  predicate: action => (
    [
      tracksGetAll.fulfilled.type,
      tracksGet.fulfilled.type,
    ]
      .includes(
        action.type,
      )
  ),
  effect: async (action, listenerApi) => {
    async function chechActionNaxTime(track: TTrack) {
      if (dateLib(getTrackElapsedTime(track)).valueOf() > time2359) {
        await listenerApi.dispatch(tracksEditItem({ ...track, active: 0 }))
        void listenerApi.dispatch(tracksGet(track.id))
      }
    }

    if (Array.isArray(action.payload)) {
      action.payload.forEach(track => { void chechActionNaxTime(track); })
    } else {
      void chechActionNaxTime(action.payload)
    }
  },
})
