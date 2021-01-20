import axios from "@/axios";
export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
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
      axios.post("/api/login", credentials).then((response) => {
        console.log(response.data.data);
        return dispatch("attempt", response.data.data.token);
      });
    },

    async attempt({ commit, state }, token) {
      console.log("**222**");
      if (token) {
        console.log("--------$$$$$$---------");
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        console.log("---------####--------");
        return;
      }

      try {
        console.log("me api...calling...");
        let response = await axios.get("api/me");
        console.log(response.data);



        commit("SET_USER", response.data);
      } catch (e) {
        console.log("-------vvvvvv----------");
        console.log(e);
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
  },
};
