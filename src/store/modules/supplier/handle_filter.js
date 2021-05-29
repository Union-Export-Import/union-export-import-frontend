const state = {
  open: false
};

const mutations = {
  HANDLE_SUPPLIER_FILTER_BOX(state) {
    state.open = !state.open;
  }
};

const getters = {
  supplierFilterOpen: state => state.open
};

export default {
  state,
  mutations,
  getters
};
