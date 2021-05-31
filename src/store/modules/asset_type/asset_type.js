import AssetTypeService from "@/services/asset_type/AssetTypeService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  loading: false,
  asset_type: null,
  asset_types: null,
  sortBy: {
    key: "id",
    type: "desc"
  },
  open: false
};
export const mutations = {
  SET_ASSET_TYPES(state, assetTypeData) {
    state.asset_types = assetTypeData;
  },

  STOP_LOADING(state) {
    state.loading = false;
  },

  SET_ASSET_TYPE(state, assetTypeData) {
    state.asset_type = assetTypeData;
  },

  LOADING(state) {
    state.loading = true;
  },

  ASSET_TYPE_FILTER_BOX(state) {
    state.open = !state.open;
  },

  SORT_TYPE(state, type) {
    state.sortBy.type = type;
  }
};
export const actions = {
  //get  asset types lists
  getAssetTypes({ state, commit }) {
    AssetTypeService.filterAssetType({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_ASSET_TYPES", response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  },
  //sorting asset type list
  getSortingAssetTypes({ state, commit }) {
    AssetTypeService.filterAssetType({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_ASSET_TYPES", response.data);
        commit("STOP_LOADING");
      })
      .catch(error => {
        console.log("error", error.message);
        commit("STOP_LOADING");
      });
  },

  //create asset type
  createAssetType({ commit }, payload) {
    commit("STOP_LOADING");
    return AssetTypeService.createAssetType(payload);
  },

  //update asset type
  updateAsset({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return AssetTypeService.updateAsset(form, id);
  },

  // asset type detail
  getAssetType({ commit, getters }, id) {
    const asset_type = getters.getAssetTypeById(id);
    if (asset_type) {
      commit("SET_ASSET_TYPE", asset_type);
    } else {
      AssetTypeService.getAssetType(id)
        .then(res => {
          commit("SET_ASSET_TYPE", res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  //asset type list when click pagination
  assetTypePagiClick({ commit }, pageNo) {
    commit("LOADING");
    AssetTypeService.filterAssetType({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_ASSET_TYPES", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },
  //sorting asset type lists
  assetTypeSorting({ dispatch, commit, state }, column) {
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
  getAssetTypeById: state => id => {
    return state.asset_types.data.find(asset_type => asset_type.id == id);
  }
};
