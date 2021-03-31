import { createStore } from "vuex";
import auth from "./auth";
import handleSidebar from "./modules/handle_sidebar";
import handleFilterBox from "./modules/uac/handle_filter";
import handleSuplierFilterBox from "./modules/suplier/handler_filter";
import uac from "./modules/uac/uac";
import customer from "./modules/customer/customer";
import handleCustomerFilterBox from "./modules/customer/handle_filter";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    handleSidebar,
    handleSuplierFilterBox,
    auth,
    uac,
    handleFilterBox,
    customer,
    handleCustomerFilterBox,

  },
});
