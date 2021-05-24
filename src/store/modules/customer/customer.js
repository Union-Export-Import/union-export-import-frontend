const state = {
  customers: null,
  customer: null,
};

const mutations = {
  ADD_CUSTOMER_DATA: (state, data) => {
    state.customers = data;
  },
  ADD_CUSTOMER: (state, data) => {
    state.customer = data;
  },
};

const getters = {
  getCustomers: (state) => state.customers,
  getCustomer: (state) => state.customer,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
