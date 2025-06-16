import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { type TStoreStatus } from "store";
import { type RootState } from "store/redux/store";
import { getMaxElapsedTime } from "common/dateTime";
import { fsDelete, fsGet, fsGetAll, fsGetAllByField, fsSet, fsUpdate } from "api/firebase";
import { type TTrack } from "../types";

const storeName = "tracks";

function getNotActiveTrackEplapsedTime(track: TTrack) {
  const elapsedTime = track.elapsedTime + (+new Date() - +new Date(track.startTime));
  return getMaxElapsedTime(elapsedTime);
}

export const tracksAddNew = createAsyncThunk(`${storeName}/tracksAddNew`, async (track: TTrack) => {
  const savedTrack = await fsSet(storeName, track);
  return savedTrack as TTrack;
});

export const tracksStartStopItem = createAsyncThunk(`${storeName}/tracksStartStopItem`, async (track: TTrack) => {
  const editTrack = { ...track };
  if (editTrack.active) {
    editTrack.startTime = new Date().toISOString();
  } else {
    if (editTrack.startTime) {
      editTrack.elapsedTime = getNotActiveTrackEplapsedTime(editTrack);
    }
    editTrack.startTime = "";
  }

  await fsUpdate(storeName, editTrack.id, editTrack);
  return editTrack;
});

export const tracksEditItem = createAsyncThunk(`${storeName}/tracksEditItem`, async (track: TTrack) => {
  await fsUpdate(storeName, track.id, track);
  return track;
});

export const tracksStopOther = createAsyncThunk(`${storeName}/tracksStopOther`, async (track: TTrack) => {
  const listActive = (await fsGetAllByField(storeName, "active", 1)) as TTrack[];
  const listForStop = listActive.filter(item => item.id !== track.id);
  await Promise.all(
    listForStop.map(async item => {
      const savedTrack = { ...item };
      savedTrack.active = 0;
      savedTrack.elapsedTime = getNotActiveTrackEplapsedTime(savedTrack);
      return fsUpdate(storeName, savedTrack.id, savedTrack);
    }),
  );
  return listForStop.map(item => item.id);
});

export const tracksDeleteItem = createAsyncThunk(`${storeName}/tracksDeleteItem`, async (id: string) => {
  await fsDelete(storeName, id);
  return id;
});

export const tracksGetAll = createAsyncThunk(
  `${storeName}/tracksGetAll`,
  async ({ dateStart, dateEnd }: { dateStart: string; dateEnd: string }) => {
    const result = await fsGetAll(storeName, dateStart, dateEnd);
    return result as TTrack[];
  },
);

export const tracksGet = createAsyncThunk(`${storeName}/tracksGet`, async (id: string) => {
  const track = await fsGet(storeName, id);
  return track as TTrack;
});

export const tracksAdapter = createEntityAdapter<TTrack>();
const extraFields: {
  status: TStoreStatus;
} = {
  status: "idle",
};
const initialState = tracksAdapter.getInitialState(extraFields);

export const TracksSlice = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(tracksAddNew.pending, state => {
        state.status = "pending";
      })
      .addCase(tracksAddNew.fulfilled, (state, action) => {
        tracksAdapter.addOne(state, action.payload);
      })
      .addCase(tracksGetAll.pending, state => {
        state.status = "pending";
      })
      .addCase(tracksGetAll.fulfilled, (state, action) => {
        tracksAdapter.setAll(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(tracksGet.pending, state => {
        state.status = "pending";
      })
      .addCase(tracksGet.fulfilled, (state, action) => {
        if (action.payload) {
          tracksAdapter.setOne(state, action.payload);
        } else {
          console.error("Not found track: ", action.meta);
        }
        state.status = "succeeded";
      })
      .addCase(tracksDeleteItem.pending, state => {
        state.status = "pending";
      })
      .addCase(tracksDeleteItem.fulfilled, (state, action) => {
        tracksAdapter.removeOne(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(tracksStartStopItem.pending, state => {
        state.status = "pending";
      })
      .addCase(tracksStartStopItem.fulfilled, (state, action) => {
        tracksAdapter.setOne(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(tracksEditItem.pending, state => {
        state.status = "pending";
      })
      .addCase(tracksEditItem.fulfilled, (state, action) => {
        tracksAdapter.setOne(state, action.payload);
        state.status = "succeeded";
      });
  },
});

export const TracksActions = TracksSlice.actions;
export const TracksReducer = TracksSlice.reducer;

export const {
  selectById: selectTrackById,
  selectIds: selectTrackIds,
  selectEntities: selectTrackEntities,
  selectAll: selectAllTracks,
  selectTotal: selectTotalTracks,
} = tracksAdapter.getSelectors<RootState>(state => state.tracks);
