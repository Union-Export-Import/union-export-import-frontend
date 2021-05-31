import SupplierService from "@/services/supplier/SupplierService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  suppliers: null,
  supplier: null,
  data: [
    {
      id: 3,
      name: "i",
      company_name: "i",
      address: "i",
      email: "i",
      phone_number: "ii",
      supplied_product: "i",
      bank_account: "ii",
      remark: "ii",
      created_at: "2021-05-29 16:36:51",
      updated_at: "2021-05-29 16:36:51"
    },
    {
      id: 2,
      name: "Mg Supp",
      company_name: "Supp Com",
      address: "Com",
      email: "com@aa.com",
      phone_number: "5423974982",
      supplied_product: "iPod, iPad, MacBook",
      bank_account: "2437987942afew",
      remark: "jfiweooe",
      created_at: "2021-05-25 07:42:59",
      updated_at: "2021-05-29 16:35:39"
    },
    {
      id: 1,
      name: "Mg Supp",
      company_name: "Supp Com",
      address: "Com",
      email: "com@aa.com",
      phone_number: "5423974982",
      supplied_product: "iPod, iPad",
      bank_account: "2437987942afew",
      remark: "jfiweooe",
      created_at: "2021-05-25 06:05:43",
      updated_at: "2021-05-25 06:05:43"
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
  }
};
export const actions = {
  getSuppliers({ state }) {
    return SupplierService.filterSuppliers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
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
      ...filter([], "AND")
    })
      .then(response => {
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
  getSupplier({ commit, getters }, id) {
    const supplier = getters.getSupplierById(id);
    if (supplier) {
      commit("SET_SUPPLIER", supplier);
    } else {
      SupplierService.getSupplier(id)
        .then(res => {
          commit("SET_SUPPLIER", res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
export const getters = {
  supplierFilterOpen: state => state.open,
  getSupplier: state => state.supplier,
  getSupplierById: state => id => {
    return state.suppliers.data.find(supplier => supplier.id == id);
  }
};
