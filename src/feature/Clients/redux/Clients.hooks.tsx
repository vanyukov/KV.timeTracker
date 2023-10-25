import { useAppSelector } from "store"
import { selectAllClients, selectClientById } from "./Clients.slice"

export function useClientList() {
  return useAppSelector(selectAllClients)
}

export function useClientById(id: string) {
  return useAppSelector(state => selectClientById(state, id))
}

export function useClientListStatus() {
  return useAppSelector(state => state.clients.status)
}
