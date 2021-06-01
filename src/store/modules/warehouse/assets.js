import AssetService from "@/services/assets/AssetService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  assets: null,
  asset: null,
  data: [
    {
      id: 1,
      asset_name: "Shop1",
      asset_type_id: 1,
      created_at: "2021-05-25T10:10:27.000000Z",
      updated_at: "2021-05-25T10:10:27.000000Z",
      asset_type: "Miss India Welch"
    }
  ],
  asset_types: null,
  sortBy: {
    key: "id",
    type: "desc"
  },
  loading: false,
  payload: null,
  open: false
};
export const mutations = {
  SET_ASSETS(state, assets) {
    state.assets = assets;
  },

  SET_ASSET(state, asset) {
    state.asset = asset;
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

  HANDLE_ASSET_FILTER_BOX(state) {
    state.open = !state.open;
  }
};
export const actions = {
  //get assets lists
  getAssets({ state }) {
    return AssetService.filterAssets({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    });
  },

  //sorting asset list
  getSortingAssets({ state, commit }) {
    AssetService.filterAssets({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_ASSETS", response.data);
        commit("STOP_LOADING");
      })
      .catch(error => {
        console.log("error", error.message);
        commit("STOP_LOADING");
      });
  },

  //create asset
  createAsset({ commit }, assetData) {
    commit("STOP_LOADING");
    return AssetService.createAsset(assetData);
  },

  //update asset
  updateAsset({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return AssetService.updateAsset(form, id);
  },

  //asset list when click pagination
  assetPagiClick({ commit }, pageNo) {
    commit("LOADING");
    AssetService.filterAssets({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_ASSETS", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },

  //sorting asset lists
  assetSort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        return dispatch("getSortingAssets");
      } else {
        commit("SORT_TYPE", "asc");
        return dispatch("getSortingAssets");
      }
    } else {
      state.sortBy.key = column;
      return dispatch("getSortingAssets");
    }
  },

  // asset detail
  getAsset({ commit, getters }, id) {
    const asset = getters.getAssetById(id);
    if (asset) {
      commit("SET_ASSET", asset);
      commit("STOP_LOADING");
    } else {
      AssetService.getAsset(id)
        .then(res => {
          commit("SET_ASSET", res.data.data);
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
  getAssetById: state => id => {
    if (state.assets) {
      return state.assets.data.find(asset => asset.id == id);
    }
  }
};
