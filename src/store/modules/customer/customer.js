import CustomerService from "@/services/customer/CustomerService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  customers: null,
  customer: null,
  data: [
    {
      id: 1,
      name: "Mg Mg",
      company_name: "Mg COM",
      address: "COM",
      email: "dm@gm.com",
      phone_number: "098765433",
      bank_acc: "fjweio238749",
      remark: "efjwiojfoiewjofw",
      created_at: "2021-05-25 06:05:41",
      updated_at: "2021-05-25 06:05:41"
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
  SET_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
  SET_CUSTOMER(state, customer) {
    state.customer = customer;
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
  HANDLE_CUSTOMER_FILTER_BOX(state) {
    state.open = !state.open;
  }
};
export const actions = {
  getCustomers({ state }) {
    return CustomerService.filterCustomers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    });
  },
  createCustomer({ commit }, customerData) {
    commit("STOP_LOADING");
    return CustomerService.createCustomer(customerData);
  },
  updateCustomer({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return CustomerService.updateCustomer(form, id);
  },
  customerPagiClick({ commit }, pageNo) {
    commit("LOADING");
    CustomerService.filterCustomers({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_CUSTOMERS", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },
  customerSort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        dispatch("getCustomers");
        commit("STOP_LOADING");
      } else {
        commit("SORT_TYPE", "asc");
        dispatch("getCustomers");
        commit("STOP_LOADING");
      }
    } else {
      state.sortBy.key = column;
      dispatch("getCustomers");
      commit("STOP_LOADING");
    }
  },
  getCustomer({ commit, getters }, id) {
    const customer = getters.getCustomerById(id);
    if (customer) {
      commit("SET_CUSTOMER", customer);
    } else {
      CustomerService.getCustomer(id)
        .then(res => {
          commit("SET_CUSTOMER", res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
export const getters = {
  customerFilterOpen: state => state.open,
  getCustomer: state => state.customer,
  getCustomerById: state => id => {
    return state.customers.data.find(customer => customer.id == id);
  }
};
