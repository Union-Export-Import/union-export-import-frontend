const state = {
  open: false,
};

const mutations = {
  handleSuplierFilterBox: (state) => {
    state.open = !state.open;
  },
};

const getters = {
  filterSuplierOpen: (state) => state.open,
};

export default {
  state,
  mutations,
  getters,
};
