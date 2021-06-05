import UserService from "@/services/users/UserService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  users: null,
  user: null,
  data: [
    {
      id: 1,
      name: "Admin",
      email: "admin@admin.com",
      email_verified_at: null,
      account_status: "Active",
      created_at: "2021-05-31T16:43:44.000000Z",
      updated_at: "2021-05-31T16:43:44.000000Z",
      nrc: null,
      phone_number: null,
      roles: [
        {
          id: 1,
          title: "Admin",
          created_at: null,
          updated_at: null,
          pivot: {
            user_id: 1,
            role_id: 1
          }
        }
      ]
    }
  ],
  sortBy: {
    key: "id",
    type: "desc"
  },
  loading: false,
  payload: null,
  open: false
};
export const mutations = {
  SET_USERS(state, userData) {
    state.users = userData;
  },

  SET_USER(state, user) {
    state.user = user;
  },

  LOADING(state) {
    state.loading = true;
  },

  STOP_LOADING(state) {
    state.loading = false;
  },

  SORT_TYPE(state, type) {
    state.sortBy.type = type;
  },

  SET_FORM_DATA(state, payload) {
    state.payload = payload;
  },

  USER_FILTER(state) {
    state.open = !state.open;
  }
};
export const actions = {
  //get assets lists
  getUsers({ state, commit }) {
    commit("LOADING");
    UserService.filterUsers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_USERS", response.data);
        commit("STOP_LOADING");
      })
      .catch(error => {
        console.log("error", error.message);
        commit("STOP_LOADING");
      });
  },

  //sorting asset list
  // getSortingAssets({ state, commit }) {
  //   AssetService.filterAssets({
  //     ...sortingParams(state.sortBy.key, state.sortBy.type),
  //     ...paginationParams(1, 10),
  //     ...filter([], "AND")
  //   })
  //     .then(response => {
  //       commit("SET_ASSETS", response.data);
  //       commit("STOP_LOADING");
  //     })
  //     .catch(error => {
  //       console.log("error", error.message);
  //       commit("STOP_LOADING");
  //     });
  // },

  //create asset
  createAsset({ commit }, assetData) {
    commit("STOP_LOADING");
    return UserService.createAsset(assetData);
  },

  //update asset
  updateAsset({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return UserService.updateAsset(form, id);
  },

  //asset list when click pagination
  userPagiClick({ commit }, pageNo) {
    commit("LOADING");
    UserService.filterUsers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_USERS", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },

  //sorting asset lists
  userSort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        return dispatch("getUsers");
      } else {
        commit("SORT_TYPE", "asc");
        return dispatch("getUsers");
      }
    } else {
      state.sortBy.key = column;
      return dispatch("getUsers");
    }
  },

  // asset detail
  getUser({ commit, getters }, id) {
    const user = getters.getUserById(id);
    if (user) {
      commit("SET_USER", user);
      commit("STOP_LOADING");
    } else {
      UserService.getUser(id)
        .then(res => {
          commit("SET_USER", res.data.data);
          commit("STOP_LOADING");
        })
        .catch(e => {
          console.log(e);
          commit("STOP_LOADING");
        });
    }
  }
};
export const getters = {
  assetFilterOpen: state => state.open,
  getAsset: state => state.asset,
  getUserById: state => id => {
    if (state.users) {
      return state.users.data.find(user => user.id == id);
    }
  }
};
