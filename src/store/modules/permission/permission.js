// import RoleService from "@/services/roles/RoleService.js";
import PermissionService from "@/services/permissions/PermissionService";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  loading: false,
  permissions: null,
  role: null,
  sortBy: {
    key: "id",
    type: "asc"
  },
  open: false
};
export const mutations = {
  SET_PERMISSIONS(state, roleData) {
    state.permissions = roleData;
  },

  STOP_LOADING(state) {
    state.loading = false;
  },

  SET_PERMISSION(state, roleData) {
    state.permissions = roleData;
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
  //get  permissions lists
  getPermissions({ state, commit }) {
    PermissionService.filterPermissions({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 100),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_PERMISSIONS", response.data);
        commit("STOP_LOADING");
      })
      .catch(error => {
        console.log(error.message);
        commit("STOP_LOADING");
      });
  },

  //create asset type
  createRole({ commit }, payload) {
    commit("STOP_LOADING");
    return PermissionService.createRole(payload);
  },

  //update asset type
  updateRole({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return PermissionService.updateRole(form, id);
  },

  // asset type detail
  getRole({ commit, getters }, id) {
    const role = getters.getRoleById(id);
    if (role) {
      commit("SET_PERMISSION", role);
    } else {
      PermissionService.getRole(id)
        .then(res => {
          commit("SET_PERMISSION", res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  //asset type list when click pagination
  rolePagiClick({ commit }, pageNo) {
    commit("LOADING");
    PermissionService.filterAssetType({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_PERMISSIONS", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },
  //sorting asset type lists
  roleSort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        return dispatch("getSortingAssetTypes");
      } else {
        commit("SORT_TYPE", "asc");
        return dispatch("getSortingAssetTypes");
      }
    } else {
      state.sortBy.key = column;
      return dispatch("getSortingAssetTypes");
    }
  }
};

export const getters = {
  getAssetType: state => state.assetType,
  getRoleById: state => id => {
    return state.roles.data.find(role => role.id == id);
  }
};
