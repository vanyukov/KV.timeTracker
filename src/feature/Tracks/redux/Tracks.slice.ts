import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { type TStoreStatus, dbStore } from "store"
import { type RootState } from "store/redux/store"
import { getMaxElapsedTime } from "common/dateTime"
import { type TTrack } from "../types"

const storeName = "tracks"

function getNotActiveTrackEplapsedTime(track: TTrack) {
  const elapsedTime = track.elapsedTime + (+new Date() - +new Date(track.startTime))
  return getMaxElapsedTime(elapsedTime)
}

export const tracksAddNew = createAsyncThunk(
  `${storeName}/tracksAddNew`,
  async (track: TTrack) => {
    await dbStore.put(storeName, track)
    return track
  },
)

export const tracksEditItem = createAsyncThunk(
  `${storeName}/tracksEditItem`,
  async (track: TTrack) => {
    const editTrack = { ...track }
    if (editTrack.active) {
      editTrack.startTime = new Date().toISOString()
    } else {
      if (editTrack.startTime) {
        editTrack.elapsedTime = getNotActiveTrackEplapsedTime(editTrack)
      }
      editTrack.startTime = ""
    }

    await dbStore.put(storeName, editTrack)
    return editTrack
  },
)

export const tracksStopOther = createAsyncThunk(
  `${storeName}/tracksStopOther`,
  async (track: TTrack) => {
    const listActive = await dbStore.getAll(storeName, 1, "active")
    const listForStop = listActive.filter(item => item.id !== track.id)
    listForStop.forEach(item => {
      const savedTrack = { ...item }
      savedTrack.active = 0
      savedTrack.elapsedTime = getNotActiveTrackEplapsedTime(savedTrack)
      void dbStore.put(storeName, savedTrack)
    })
    return listForStop.map(item => item.id)
  },
)

export const tracksDeleteItem = createAsyncThunk(
  `${storeName}/tracksDeleteItem`,
  async (id: string) => {
    await dbStore.delete(storeName, id)
    return id
  },
)

export const tracksGetAll = createAsyncThunk(
  `${storeName}/tracksGetAll`,
  async ({ dateStart, dateEnd }: { dateStart: string, dateEnd: string }) => {
    const keyRangeValue = IDBKeyRange.bound(dateStart, dateEnd)
    const list = await dbStore.getAll(storeName, keyRangeValue, "date")
    return list
  },
)

export const tracksGet = createAsyncThunk(
  `${storeName}/tracksGet`,
  async (key: IDBValidKey | IDBKeyRange) => {
    const track = await dbStore.get(storeName, key)
    return track
  },
)

export const tracksAdapter = createEntityAdapter<TTrack>()
const extraFields: {
  status: TStoreStatus
} = {
  status: "idle",
}
const initialState = tracksAdapter.getInitialState(extraFields)

export const TracksSlice = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(tracksAddNew.pending, state => {
        state.status = "pending"
      })
      .addCase(tracksAddNew.fulfilled, (state, action) => {
        tracksAdapter.addOne(state, action.payload)
      })
      .addCase(tracksGetAll.pending, state => {
        state.status = "pending"
      })
      .addCase(tracksGetAll.fulfilled, (state, action) => {
        tracksAdapter.setAll(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(tracksGet.pending, state => {
        state.status = "pending"
      })
      .addCase(tracksGet.fulfilled, (state, action) => {
        if (action.payload) {
          tracksAdapter.setOne(state, action.payload)
        } else {
          console.error("Not found track: ", action.meta)
        }
        state.status = "succeeded"
      })
      .addCase(tracksDeleteItem.pending, state => {
        state.status = "pending"
      })
      .addCase(tracksDeleteItem.fulfilled, (state, action) => {
        tracksAdapter.removeOne(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(tracksEditItem.pending, state => {
        state.status = "pending"
      })
      .addCase(tracksEditItem.fulfilled, (state, action) => {
        tracksAdapter.setOne(state, action.payload)
        state.status = "succeeded"
      })
  },
})

export const TracksActions = TracksSlice.actions
export const TracksReducer = TracksSlice.reducer

export const {
  selectById: selectTrackById,
  selectIds: selectTrackIds,
  selectEntities: selectTrackEntities,
  selectAll: selectAllTracks,
  selectTotal: selectTotalTracks,
} = tracksAdapter.getSelectors<RootState>(state => state.tracks)
