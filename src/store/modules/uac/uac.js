const state = {
    users: null,
    user: null,
    roles: null,
    permissions:null
};

const mutations = {
    ADD_UAC_DATA: (state, data) => {
        state.users = data.data;
    },
    GET_ROLE_DATA: (state, data) => {
        console.log("object", data.data);
        state.roles = data.data;
    },
    ADD_USER: (state, data) => {
        state.user = data;
        console.log(state.user);
    },
};

const getters = {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getRoles: state => state.roles
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
