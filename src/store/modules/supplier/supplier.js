import SupplierService from "@/services/supplier/SupplierService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  suppliers: null,
  supplier: null,
  sortBy: {
    key: "id",
    type: "desc",
  },
  loading: false,
  payload: null,
  open: false,
};
export const mutations = {
  SET_SUPPLIERS(state, suppliers) {
    state.suppliers = suppliers;
  },
  SET_SUPPLIER(state, supplier) {
    state.supplier = supplier;
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
  HANDLE_SUPPLIER_FILTER_BOX(state) {
    state.open = !state.open;
  },
};
export const actions = {
  getSuppliers({ state }) {
    return SupplierService.filterSuppliers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND"),
    });
  },
  createSupplier({ commit }, supplierData) {
    commit("STOP_LOADING");
    return SupplierService.createSupplier(supplierData);
  },
  updateSupplier({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return SupplierService.updateSupplier(form, id);
  },
  supplierPagiClick({ commit }, pageNo) {
    commit("LOADING");
    SupplierService.filterSuppliers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND"),
    })
      .then((response) => {
        commit("STOP_LOADING");
        commit("SET_SUPPLIERS", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },
  supplierSort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        dispatch("getSuppliers");
        commit("STOP_LOADING");
      } else {
        commit("SORT_TYPE", "asc");
        dispatch("getSuppliers");
        commit("STOP_LOADING");
      }
    } else {
      state.sortBy.key = column;
      dispatch("getSuppliers");
      commit("STOP_LOADING");
    }
  },
  getSupplier({ commit }, id) {
    SupplierService.getSupplier(id)
      .then((res) => {
        commit("SET_SUPPLIER", res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
export const getters = {
  supplierFilterOpen: (state) => state.open,
  getSupplier: (state) => state.supplier,
};
