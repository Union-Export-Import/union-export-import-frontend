const state = {
  isCollapse: false
};

const mutations = {
  handleCollapse: state => {
    state.isCollapse = !state.isCollapse;
  }
};

const getters = {
  getCollapse: state => state.isCollapse
};

export default {
  state,
  mutations,
  getters
};
