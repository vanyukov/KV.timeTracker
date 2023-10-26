import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { type TStoreStatus, dbStore } from "store"
import { type RootState } from "store/redux/store"
import { type TProject } from "../types"

const storeName = "projects"

export const projectsAddNew = createAsyncThunk(
  `${storeName}/projectsAddNew`,
  async (client: TProject) => {
    await dbStore.put(storeName, client)
    return client
  },
)

export const projectsEditItem = createAsyncThunk(
  `${storeName}/projectsEditItem`,
  async (client: TProject) => {
    await dbStore.put(storeName, client)
    return client
  },
)

export const projectsDeleteItem = createAsyncThunk(
  `${storeName}/projectsDeleteItem`,
  async (id: string) => {
    await dbStore.delete(storeName, id)
    return id
  },
)

export const projectsGetAll = createAsyncThunk(
  `${storeName}/projectsGetAll`,
  async () => {
    const list = await dbStore.getAll<TProject>(storeName)
    return list
  },
)

export const projectsGet = createAsyncThunk(
  `${storeName}/projectsGet`,
  async (key: IDBValidKey | IDBKeyRange) => {
    const client = await dbStore.get<TProject>(storeName, key)
    return client
  },
)

export const projectsAdapter = createEntityAdapter<TProject>()
const extraFields: {
  status: TStoreStatus
} = {
  status: "idle",
}
const initialState = projectsAdapter.getInitialState(extraFields)

export const ProjectsSlice = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(projectsAddNew.pending, state => {
        state.status = "pending"
      })
      .addCase(projectsAddNew.fulfilled, (state, action) => {
        projectsAdapter.addOne(state, action.payload)
      })
      .addCase(projectsGetAll.pending, state => {
        state.status = "pending"
      })
      .addCase(projectsGetAll.fulfilled, (state, action) => {
        projectsAdapter.setAll(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(projectsGet.pending, state => {
        state.status = "pending"
      })
      .addCase(projectsGet.fulfilled, (state, action) => {
        if (action.payload) {
          projectsAdapter.setOne(state, action.payload)
        } else {
          console.error("Not found client: ", action.meta)
        }
        state.status = "succeeded"
      })
      .addCase(projectsDeleteItem.pending, state => {
        state.status = "pending"
      })
      .addCase(projectsDeleteItem.fulfilled, (state, action) => {
        projectsAdapter.removeOne(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(projectsEditItem.pending, state => {
        state.status = "pending"
      })
      .addCase(projectsEditItem.fulfilled, (state, action) => {
        projectsAdapter.setOne(state, action.payload)
        state.status = "succeeded"
      })
  },
})

export const ProjectsActions = ProjectsSlice.actions
export const ProjectsReducer = ProjectsSlice.reducer

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
  selectTotal: selectTotalProjects,
} = projectsAdapter.getSelectors<RootState>(state => state.projects)
