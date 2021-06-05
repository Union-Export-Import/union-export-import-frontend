import RoleService from "@/services/roles/RoleService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  loading: false,
  roles: null,
  role: null,
  data: [
    {
      id: 1,
      role_name: "Aung Myo Oo",
      created_at: "2020-10-10T07:34:41.000000Z",
      updated_at: "2020-10-10T07:37:43.000000Z"
    }
  ],
  sortBy: {
    key: "id",
    type: "desc"
  },
  open: false
};
export const mutations = {
  SET_ROLES(state, roleData) {
    state.roles = roleData;
  },

  STOP_LOADING(state) {
    state.loading = false;
  },

  SET_ROLE(state, roleData) {
    state.roles = roleData;
  },

  LOADING(state) {
    state.loading = true;
  },

  ROLE_FILTER(state) {
    state.open = !state.open;
  },

  SORT_TYPE(state, type) {
    state.sortBy.type = type;
  }
};
export const actions = {
  //get  role lists
  getRoles({ state, commit }) {
    commit("LOADING");
    RoleService.filterRoles({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_ROLES", response.data);
        commit("STOP_LOADING");
      })
      .catch(error => {
        console.log(error.message);
        commit("STOP_LOADING");
      });
  },

  //create role
  createRole({ commit }, payload) {
    commit("STOP_LOADING");
    return RoleService.createRole(payload);
  },

  //update role
  updateRole({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return RoleService.updateRole(form, id);
  },

  // role detail
  getRole({ commit, getters }, id) {
    const role = getters.getRoleById(id);
    if (role) {
      commit("SET_ROLE", role);
    } else {
      RoleService.getRole(id)
        .then(res => {
          commit("SET_ROLE", res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  //role list when click pagination
  rolePagiClick({ commit, state }, pageNo) {
    commit("LOADING");
    RoleService.filterRoles({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_ROLES", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },
  //sorting role lists
  roleSort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        dispatch("getRoles");
      } else {
        commit("SORT_TYPE", "asc");
        dispatch("getRoles");
      }
    } else {
      state.sortBy.key = column;
      dispatch("getRoles");
    }
  }
};

export const getters = {
  getAssetType: state => state.assetType,
  getRoleById: state => id => {
    return state.roles.data.find(role => role.id == id);
  }
};
