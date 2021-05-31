const state = {
  open: false
};

const mutations = {
  HANDLE_CATEGORY_FILTER_BOX(state) {
    state.open = !state.open;
  }
};

const getters = {
  categoryFilterOpen: state => state.open
};

export default {
  state,
  mutations,
  getters
};
