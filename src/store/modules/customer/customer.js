const state = {
  customers: null,
  customer: null,
  data: [
    {
      id: 1,
      name: "Facilis pariatur Ex",
      company_name: "In iste qui eum labo",
      address: "Tempora amet quo si",
      email: "Quod pariatur Quisq",
      phone_number: "19",
      bank_acc: "9",
      remark: "Et quaerat eum incid",
      created_at: "2021-05-28 17:20:47",
      updated_at: "2021-05-28 17:20:47"
    }
  ]
};

const mutations = {
  ADD_CUSTOMER_DATA: (state, data) => {
    state.customers = data;
  },
  ADD_CUSTOMER: (state, data) => {
    state.customer = data;
  }
};

const getters = {
  getCustomers: state => state.customers,
  getCustomer: state => state.customer
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
