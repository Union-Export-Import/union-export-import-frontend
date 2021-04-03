import AssetService from "@/services/assets/AssetService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
    assets: null,
    asset_types: null,
    sortBy: {
        key: "id",
        type: "desc"
    },
    loading: false,
    payload: null,
    open: false,
}
export const mutations = {
    SET_ASSETS(state, assets) {
        state.assets = assets
    },
    SET_ASSET_TYPES(state, asset_types) {
        state.asset_types = asset_types
    },
    LOADING(state) {
        state.loading = true
    },
    STOP_LOADING(state) {
        state.loading = false
    },
    SORT_TYPE(state, type) {
        state.sortBy.type = type
    },
    SET_FORM_DATA(state, payload) {
        state.payload = payload
    },
    HANDLE_ASSET_FILTER_BOX() {
        state.open = !state.open;
    }
}
export const actions = {
    getAssets({ state }) {
        return AssetService.filterAssets({
            ...sortingParams(state.sortBy.key, state.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
        })
    },
    getAssetTypes({ state, commit }) {
        AssetService.filterAssetTypes({
            ...sortingParams(state.sortBy.key, state.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
        }).then(response => {
            commit('SET_ASSET_TYPES', response.data.data)
        }).catch(error => {
            console.log(error.message)
        })
    },
    createAsset({ commit, state }, assetData) {
        commit('SET_FORM_DATA', assetData)
        commit('STOP_LOADING')
        return AssetService.createAsset(state.payload)
    },
    assetPagiClick({ commit }, pageNo) {
        AssetService.filterAssets({
            ...sortingParams(state.sortBy.key, state.sortBy.type),
            ...paginationParams(pageNo, 10),
            ...filter([], "AND")
        }).then(response => {
            commit('STOP_LOADING')
            commit('SET_ASSETS', response.data)
        }).catch(error => {
            console.log(error.message)
        })
    },
    assetSort({ dispatch, commit, state }, column) {
        if (state.sortBy.key == column) {
            if (state.sortBy.type == "asc") {
                commit('SORT_TYPE', 'desc')
                dispatch('getAssets')
                commit('STOP_LOADING')

            } else {
                commit('SORT_TYPE', 'asc')
                dispatch('getAssets')
                commit('STOP_LOADING')

            }
        } else {
            state.sortBy.key = column;
            dispatch('getAssets')
            commit('STOP_LOADING')

        }
    },
}
export const getters = {
    filterAssetOpen: (state) => state.open,
}