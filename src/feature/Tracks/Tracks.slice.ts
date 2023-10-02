import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { type TStoreStatus, dbStore } from "store"
import { type RootState } from "store/redux/store"
import { type TTrack } from "./types"

const storeName = "tracks"

export const tracksAddNew = createAsyncThunk(
  `${storeName}/tracksAddNew`,
  async (track: TTrack) => {
    await dbStore.put(storeName, track)
    return track
  },
)

export const tracksEdit = createAsyncThunk(
  `${storeName}/tracksEdit`,
  async (track: TTrack) => {
    await dbStore.put(storeName, track)
    return track
  },
)

export const trackDelete = createAsyncThunk(
  `${storeName}/trackDelete`,
  async (id: string) => {
    await dbStore.delete(storeName, id)
    return id
  },
)

export const tracksGetAll = createAsyncThunk(
  `${storeName}/dbGetAll`,
  async ({ dateStart, dateEnd }: { dateStart: string, dateEnd: string }) => {
    const keyRangeValue = IDBKeyRange.bound(dateStart, dateEnd)
    const list = await dbStore.getAll(storeName, keyRangeValue, "date")
    return list
  },
)

export const trackAdapter = createEntityAdapter<TTrack>()
const extraFields: {
  status: TStoreStatus
} = {
  status: "idle",
}
const initialState = trackAdapter.getInitialState(extraFields)

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
      .addCase(tracksAddNew.fulfilled, (state, action) => {
        trackAdapter.addOne(state, action.payload)
      })
      .addCase(tracksGetAll.pending, state => {
        if (state.status === "idle") {
          state.status = "pending"
        }
      })
    builder.addCase(tracksGetAll.fulfilled, (state, action) => {
      trackAdapter.setAll(state, action.payload)
      state.status = "succeeded"
    })
    builder.addCase(trackDelete.fulfilled, (state, action) => {
      trackAdapter.removeOne(state, action.payload)
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
} = trackAdapter.getSelectors<RootState>((state) => state.tracks)
