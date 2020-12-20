const state = {
  open: false,
};

const mutations = {
  handleCustomerFilterBox: (state) => {
    state.open = !state.open;
  },
};

const getters = {
  filterCustomerOpen: (state) => state.open,
};

export default {
  state,
  mutations,
  getters,
};
