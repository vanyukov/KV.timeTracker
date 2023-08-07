/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { type ClientType } from "./types"

export type ClientsState = {
  items: ClientType[]
}

const initialState: ClientsState = {
  items: [],
}

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<ClientType[]>) => {
      state.items = action.payload
    },
    add: (state, action: PayloadAction<ClientType>) => {
      state.items.push(action.payload)
    },
    delete: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const clientsActions = clientsSlice.actions

export const clientsReducer = clientsSlice.reducer
