const state = {
  open: false
};

const mutations = {
  HANDLE_ASSET_FILTER_BOX(state) {
    state.open = !state.open;
  }
};

const getters = {
  assetFilterOpen: state => state.open
};

export default {
  state,
  mutations,
  getters
};
