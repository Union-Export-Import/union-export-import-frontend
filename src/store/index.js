import { createStore } from "vuex";
import auth from "./auth";
import handleSidebar from "./modules/handle_sidebar";
import handleFilterBox from "./modules/uac/handle_filter";
import handleSupplierFilterBox from "./modules/supplier/handle_filter";
import uac from "./modules/uac/uac";
import handleRoleFilterBox from "./modules/uac/role_filter";
import handleAssetFilterBox from "./modules/warehouse/asset_filter";
import handleCustomerFilterBox from "./modules/customer/handle_filter";
import * as warehouse from "@/store/modules/warehouse/assets";
import * as assetType from "@/store/modules/asset_type/asset_type";
import * as customer from "@/store/modules/customer/customer";
import * as supplier from "@/store/modules/supplier/supplier";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    handleSidebar,
    handleFilterBox,
    handleCustomerFilterBox,
    handleRoleFilterBox,
    handleSupplierFilterBox,
    auth,
    uac,
    customer,
    supplier,
    warehouse,
    handleAssetFilterBox,
    assetType
  }
});
