import { makeNewId } from "common/helpers"
import { type TClient } from "./types"

export const clientsDB = {
  title: "clients",
  keys: { keyPath: "id" },

  index: [],

  getNew(): TClient {
    return {
      id: makeNewId(),
      name: "",
    }
  },
}
