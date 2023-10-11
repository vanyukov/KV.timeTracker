import { configureStore } from "@reduxjs/toolkit"
import {
  useSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from "react-redux"
import { changeTrackActivityListenerMiddleware, maxTimeListenerMiddleware } from "feature/Tracks/redux"
import { reducer } from "./reducer"

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(
    changeTrackActivityListenerMiddleware.middleware,
    maxTimeListenerMiddleware.middleware,
  ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
