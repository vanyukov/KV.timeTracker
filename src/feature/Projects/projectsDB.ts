import { type TProject } from "./types"

export const projectsDB = {
  title: "projects",
  keys: { keyPath: "id" },

  index: [
    {
      name: "projectId",
      options: { unique: false },
    },
  ],

  getNew(): TProject {
    return {
      id:  "",
      name: "",
      clientId: "",
    }
  },
}
