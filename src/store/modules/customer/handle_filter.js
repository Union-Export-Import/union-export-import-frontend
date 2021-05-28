const state = {
  open: false,
};

const mutations = {
  handleFilterBox: (state) => {
    state.open = !state.open;
  },
};

const getters = {
  customerFilterOpen: (state) => state.open,
};

export default {
  state,
  mutations,
  getters,
};
