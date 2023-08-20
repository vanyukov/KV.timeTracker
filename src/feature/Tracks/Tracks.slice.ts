import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { type TStoreStatus, dbStore } from "store"
import { tracksDB } from "./tracksDB"
import { type TTrack } from "./types"

export type TracksType = {
  items: TTrack[]
  status: TStoreStatus
}

const initialState: TracksType = {
  items: [],
  status: "idle",
}

const storeName = "tracks"

export const tracksAddNew = createAsyncThunk(
  `${storeName}/tracksAddNew`,
  async () => {
    const track = tracksDB.getNew()
    await dbStore.addRow(storeName, track)
    return track
  },
)

export const tracksGetAll = createAsyncThunk(
  `${storeName}/dbGetAll`,
  async () => {
    const list = await dbStore.getAll(storeName)
    return list
  },
)

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
        state.items.push(action.payload)
      })
      .addCase(tracksGetAll.pending, state => {
        if (state.status === "idle") {
          state.status = "pending"
        }
      })
    builder.addCase(tracksGetAll.fulfilled, (state, action) => {
      state.items = action.payload || []
      state.status = "succeeded"
    })
  },
})

export const TracksActions = TracksSlice.actions
export const TracksReducer = TracksSlice.reducer