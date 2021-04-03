const state = {
    open: false,
};

const mutations = {
    HANDLE_ROLE_FILTER_BOX(state) {
        state.open = !state.open;
    },

};

const getters = {
    filterRoleOpen: (state) => state.open,
};

export default {
    state,
    mutations,
    getters,
};
