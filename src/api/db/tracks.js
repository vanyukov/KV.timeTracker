const tracks = {
  getNew() {
    return {
      active: true,
      startTime: new Date(),
      client: "",
      elapsedTime: 0,
      date: new Date(),
      ticket: "",
      ticketTitle: "",
      branch: "",
      epic: "",
      comment: "",
      overtime: false,
      idUTZ: 0,
      savedJira: false,
      savedUTZ: false,
    }
  },

  keys: { keyPath: "date" },

  index: [
    {
      name: "active",
      options: { unique: false },
    },
  ],
}

export default tracks
