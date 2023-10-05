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

export const tracksEditItem = createAsyncThunk(
  `${storeName}/tracksEditItem`,
  async (track: TTrack) => {
    await dbStore.put(storeName, track)
    return track
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
      .addCase(tracksAddNew.fulfilled, (state, action) => {
        tracksAdapter.addOne(state, action.payload)
      })
      .addCase(tracksGetAll.pending, state => {
        if (state.status === "idle") {
          state.status = "pending"
        }
      })
      .addCase(tracksGetAll.fulfilled, (state, action) => {
        tracksAdapter.setAll(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(tracksGet.pending, state => {
        if (state.status === "idle") {
          state.status = "pending"
        }
      })
      .addCase(tracksGet.fulfilled, (state, action) => {
        tracksAdapter.addOne(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(tracksDeleteItem.fulfilled, (state, action) => {
        tracksAdapter.removeOne(state, action.payload)
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
