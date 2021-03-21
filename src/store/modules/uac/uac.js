const state = {
    users: null,
    user: null,
};

const mutations = {
    ADD_UAC_DATA: (state, data) => {
        state.users = data;
    },
    ADD_USER: (state, data) => {
        state.user = data;
        console.log(state.user);
    },
};

const getters = {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
