import axios from "@/axios";
export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },

  getters: {
    authenticated(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
  },

  actions: {
    async login({ dispatch }, credentials) {
      let resp = await axios.post("/api/login", credentials);

      return dispatch("attempt", resp.data.data.token);
    },

    async attempt({ commit }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      // if (!state.token) {
      //   return;
      // }

      // try {
      //   let response = await axios.get("api/me");
      //   commit("SET_USER", response.data);
      // } catch (e) {
      //   console.log(e);
      //   commit("SET_TOKEN", null);
      //   commit("SET_USER", null);
      // }
    },

  },
};
