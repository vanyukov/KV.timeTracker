const clients = {
  getNew() {
    return {
      title: '',
      id: '',
      taskCode: '',
      taskIdCr: ''
    };
  },

  keys: { autoIncrement: true },

  index: []
};

export default clients;
