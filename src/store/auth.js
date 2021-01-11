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
      axios.post("/api/login", credentials).then(response => {
        console.log(response.data);
        var mData = JSON.parse("{" + response.data.split("}{")[1]);
        console.log(mData)
        return dispatch("attempt", mData.data.token);
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
        console.log("-----------------");
        let response = await axios.get("api/me");
        console.log(response.data);

        commit("SET_USER", response.data);
      } catch (e) {
        console.log("-------vvvvvv----------");
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
  },
};
