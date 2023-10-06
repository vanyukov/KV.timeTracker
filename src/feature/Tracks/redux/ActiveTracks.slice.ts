import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { type TStoreStatus, dbStore } from "store"
import { type RootState } from "store/redux/store"
import { type TTrack } from "../types"

const storeName = "activeTracks"
const storeDBName = "tracks"

export const activeTracksStopItem = createAsyncThunk(
  `${storeName}/activeTracksStopItem`,
  async (track: TTrack) => {
    const savedTrack = { ...track }
    savedTrack.active = 0
    savedTrack.elapsedTime += +new Date() - (+new Date(savedTrack.startTime))
    await dbStore.put(storeDBName, savedTrack)
    return savedTrack.id
  },
)

export const activeTracksGetAll = createAsyncThunk(
  `${storeName}/activeTracksGetAll`,
  async () => {
    const list = await dbStore.getAll(storeDBName, 1, "active")
    return list
  },
)

export const activeTracksAdapter = createEntityAdapter<TTrack>()
const extraFields: {
  status: TStoreStatus
} = {
  status: "idle",
}
const initialState = activeTracksAdapter.getInitialState(extraFields)

export const ActiveTracksSlice = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(activeTracksGetAll.pending, state => {
        state.status = "pending"
      })
      .addCase(activeTracksGetAll.fulfilled, (state, action) => {
        activeTracksAdapter.setAll(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(activeTracksStopItem.pending, state => {
        state.status = "pending"
      })
      .addCase(activeTracksStopItem.fulfilled, (state, action) => {
        activeTracksAdapter.removeOne(state, action.payload)
        state.status = "succeeded"
      })
  },
})

export const ActiveTracksActions = ActiveTracksSlice.actions
export const ActiveTracksReducer = ActiveTracksSlice.reducer

export const {
  selectById: selectActiveTrackById,
  selectIds: selectActiveTrackIds,
  selectEntities: selectActiveTrackEntities,
  selectAll: selectAllActiveTracks,
  selectTotal: selectTotalActiveTracks,
} = activeTracksAdapter.getSelectors<RootState>(state => state.activeTracks)
