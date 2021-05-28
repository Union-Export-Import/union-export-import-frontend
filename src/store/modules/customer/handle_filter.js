const state = {
  open: false
};

const mutations = {
  HANDLE_CUSTOMER_FILTER_BOX(state) {
    state.open = !state.open;
  }
};

const getters = {
  customerFilterOpen: state => state.open
};

export default {
  state,
  mutations,
  getters
};
