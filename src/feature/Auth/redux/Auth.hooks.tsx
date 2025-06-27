import { useAppSelector } from "store"

export function useAuthUser() {
  return useAppSelector(state => state.auth.user)
}

export function useAuthLoading() {
  return useAppSelector(state => state.auth.loading)
}

export function useAuthError() {
  return useAppSelector(state => state.auth.error)
}
