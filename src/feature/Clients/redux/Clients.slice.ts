import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { type TStoreStatus, dbStore } from "store"
import { type RootState } from "store/redux/store"
import { type TClient } from "../types"

const storeName = "clients"

export const clientsAddNew = createAsyncThunk(
  `${storeName}/clientsAddNew`,
  async (client: TClient) => {
    await dbStore.put(storeName, client)
    return client
  },
)

export const clientsEditItem = createAsyncThunk(
  `${storeName}/clientsEditItem`,
  async (client: TClient) => {
    await dbStore.put(storeName, client)
    return client
  },
)

export const clientsDeleteItem = createAsyncThunk(
  `${storeName}/clientsDeleteItem`,
  async (id: string) => {
    await dbStore.delete(storeName, id)
    return id
  },
)

export const clientsGetAll = createAsyncThunk(
  `${storeName}/clientsGetAll`,
  async () => {
    const list = await dbStore.getAll<TClient>(storeName)
    return list
  },
)

export const clientsGet = createAsyncThunk(
  `${storeName}/clientsGet`,
  async (key: IDBValidKey | IDBKeyRange) => {
    const client = await dbStore.get<TClient>(storeName, key)
    return client
  },
)

export const clientsAdapter = createEntityAdapter<TClient>()
const extraFields: {
  status: TStoreStatus
} = {
  status: "idle",
}
const initialState = clientsAdapter.getInitialState(extraFields)

export const ClientsSlice = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(clientsAddNew.pending, state => {
        state.status = "pending"
      })
      .addCase(clientsAddNew.fulfilled, (state, action) => {
        clientsAdapter.addOne(state, action.payload)
      })
      .addCase(clientsGetAll.pending, state => {
        state.status = "pending"
      })
      .addCase(clientsGetAll.fulfilled, (state, action) => {
        clientsAdapter.setAll(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(clientsGet.pending, state => {
        state.status = "pending"
      })
      .addCase(clientsGet.fulfilled, (state, action) => {
        if (action.payload) {
          clientsAdapter.setOne(state, action.payload)
        } else {
          console.error("Not found client: ", action.meta)
        }
        state.status = "succeeded"
      })
      .addCase(clientsDeleteItem.pending, state => {
        state.status = "pending"
      })
      .addCase(clientsDeleteItem.fulfilled, (state, action) => {
        clientsAdapter.removeOne(state, action.payload)
        state.status = "succeeded"
      })
      .addCase(clientsEditItem.pending, state => {
        state.status = "pending"
      })
      .addCase(clientsEditItem.fulfilled, (state, action) => {
        clientsAdapter.setOne(state, action.payload)
        state.status = "succeeded"
      })
  },
})

export const ClientsActions = ClientsSlice.actions
export const ClientsReducer = ClientsSlice.reducer

export const {
  selectById: selectClientById,
  selectIds: selectClientIds,
  selectEntities: selectClientEntities,
  selectAll: selectAllClients,
  selectTotal: selectTotalClients,
} = clientsAdapter.getSelectors<RootState>(state => state.clients)
