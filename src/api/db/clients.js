const clients = {
  getNew() {
    return {
      title: '',
      id: '',
      taskCode: '',
      taskIdCr: '',
      jira: '',
      git: '',
    }
  },

  keys: { autoIncrement: true },

  index: [],
}

export default clients
