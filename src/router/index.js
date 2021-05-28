import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/auth/Login.vue");
const UAC = () => import("@/views/uac/UserAndPermissionList.vue");
const Warehouse = () => import("@/views/warehouse/Index.vue");
const AssetCreate = () => import("@/views/warehouse/Create.vue");
const AssetEdit = () => import("@/views/warehouse/Edit.vue");
const AssetDetail = () => import("@/views/warehouse/Detail.vue");
const AssetTypeCreate = () => import("@/views/asset_types/Create.vue");
const AssetTypeEdit = () => import("@/views/asset_types/Edit.vue");
const AssetTypeDetail = () => import("@/views/asset_types/Detail.vue");
const Sale = () => import("@/views/sale/Index.vue");
const Product = () => import("@/views/product/Index.vue");
const UserCreate = () => import("@/views/uac/UserCreate.vue");
const UserEdit = () => import("@/views/uac/UserEdit.vue");
const UserDetail = () => import("@/views/uac/UserDetail.vue");

const Customer = () => import("@/views/customer/Customer.vue");
const CustomerCreate = () => import("@/views/customer/CustomerCreate.vue");
const CustomerEdit = () => import("@/views/customer/CustomerEdit.vue");
const CustomerDetail = () => import("@/views/customer/CustomerDetail.vue");

const Suplier = () => import("@/views/suplier/Suplier.vue");
const SuplierCreate = () => import("@/views/suplier/SuplierCreate.vue");
const SuplierEdit = () => import("@/views/suplier/SuplierEdit.vue");
const SuplierDetail = () => import("@/views/suplier/SuplierDetail.vue");
const ChangePassword = () => import("@/views/auth/ChangePassword");
const RoleCreate = () => import("@/views/role/Create.vue");
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      } else if (store.getters["auth/authenticated"].account_status == "Init") {
        return next({
          name: "change-password"
        });
      }

      next();
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "home"
        });
      }

      next();
    }
  },
  {
    path: "/change-password",
    name: "change-password",
    component: ChangePassword
  },
  {
    path: "/user-access-control",
    name: "uac",
    component: UAC,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/user-access-control/create",
    name: "UserCreate",
    component: UserCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/user-access-control/edit/:id",
    name: "UserEdit",
    component: UserEdit,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/user-access-control/detail/:id",
    name: "UserDetail",
    component: UserDetail
    // beforeEnter: (to, from, next) => {
    //     if (!store.getters["auth/authenticated"]) {
    //         return next({
    //             name: "login",
    //         });
    //     }
    //     next();
    // },
  },
  {
    path: "/product",
    name: "product",
    component: Product
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: Warehouse,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/warehouse/create",
    name: "AssetCreate",
    component: AssetCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/warehouse/:id",
    name: "AssetDetail",
    props: true,
    component: AssetDetail,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/warehouse/edit/:id",
    name: "AssetEdit",
    props: true,
    component: AssetEdit,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/asset-type/edit/:id",
    name: "AssetTypeEdit",
    props: true,
    component: AssetTypeEdit,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/asset-type/create",
    name: "AssetTypeCreate",
    props: true,
    component: AssetTypeCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/asset-type/:id",
    name: "AssetTypeDetail",
    props: true,
    component: AssetTypeDetail,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/sale",
    name: "sale",
    component: Sale
  },
  {
    path: "/customer",
    name: "Customer",
    component: Customer
  },
  {
    path: "/customer/create",
    name: "CustomerCreate",
    component: CustomerCreate
  },
  {
    path: "/customer/edit",
    name: "CustomerEdit",
    component: CustomerEdit
  },
  {
    path: "/customer/detail/:id",
    name: "CustomerDetail",
    component: CustomerDetail
  },
  {
    path: "/supplier",
    name: "Suplier",
    component: Suplier
  },
  {
    path: "/supplier/create",
    name: "SuplierCreate",
    component: SuplierCreate
  },
  {
    path: "/supplier/edit",
    name: "SuplierEdit",
    component: SuplierEdit
  },
  {
    path: "/supplier/show/:id",
    name: "SuplierDetail",
    component: SuplierDetail
  },
  {
    path: "/roles/create",
    name: "RoleCreate",
    component: RoleCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login"
        });
      }
      next();
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
