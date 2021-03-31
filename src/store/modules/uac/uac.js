const state = {
    users: null,
    user: null,
    roles: null
};

const mutations = {
    ADD_UAC_DATA: (state, data) => {
        state.users = data;
    },
    ADD_USER: (state, data) => {
        state.user = data;
    },
    ADD_ROLE_DATA: (state, data) => {
        state.roles = data
    }
};

const getters = {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getRoles: (state) => state.roles
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
