import { createStore } from "vuex";
import auth from "./auth";
import handleSidebar from "./modules/handle_sidebar";
import handleFilterBox from "./modules/uac/handle_filter";
import handleSuplierFilterBox from "./modules/suplier/handler_filter";
import uac from "./modules/uac/uac";
import customer from "./modules/customer/customer";
import handleCustomerFilterBox from "./modules/customer/handle_filter";
import handleRoleFilterBox from "./modules/uac/role_filter";
import handleAssetFilterBox from "./modules/warehouse/asset_filter";
import * as warehouse from "@/store/modules/warehouse/assets";
import * as assetType from "@/store/modules/asset_type/asset_type";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    handleSidebar,
    handleFilterBox,
    handleCustomerFilterBox,
    handleRoleFilterBox,
    handleSuplierFilterBox,
    auth,
    uac,
    customer,
    warehouse,
    handleAssetFilterBox,
    assetType
  }
});
