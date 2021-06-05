import { createStore } from "vuex";
import auth from "./auth";
import handleSidebar from "./modules/handle_sidebar";
import * as user from "@/store/modules/user/user";
import * as warehouse from "@/store/modules/warehouse/assets";
import * as assetType from "@/store/modules/asset_type/asset_type";
import * as customer from "@/store/modules/customer/customer";
import * as supplier from "@/store/modules/supplier/supplier";
import * as category from "@/store/modules/category/category";
import * as role from "@/store/modules/role/role";
import * as permission from "@/store/modules/permission/permission";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    handleSidebar,
    auth,
    user,
    customer,
    supplier,
    warehouse,
    assetType,
    category,
    role,
    permission
  }
});
