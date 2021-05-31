import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue")
  },
  {
    path: "/change-password",
    name: "change-password",
    component: () => import("@/views/auth/ChangePassword")
  },
  {
    path: "/user-access-control",
    name: "uac",
    component: () => import("@/views/uac/UserAndPermissionList.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/user-access-control/create",
    name: "UserCreate",
    component: () => import("@/views/uac/UserCreate.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/user-access-control/edit/:id",
    name: "UserEdit",
    component: () => import("@/views/uac/UserEdit.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/user-access-control/detail/:id",
    name: "UserDetail",
    component: () => import("@/views/uac/UserDetail.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/views/product/Index.vue")
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: () => import("@/views/warehouse/Index.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/warehouse/create",
    name: "AssetCreate",
    component: () => import("@/views/warehouse/Create.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/warehouse/:id",
    name: "AssetDetail",
    props: true,
    component: () => import("@/views/warehouse/Detail.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/warehouse/edit/:id",
    name: "AssetEdit",
    props: true,
    component: () => import("@/views/warehouse/Edit.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/asset-type/edit/:id",
    name: "AssetTypeEdit",
    props: true,
    component: () => import("@/views/asset_types/Edit.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/asset-type/create",
    name: "AssetTypeCreate",
    props: true,
    component: () => import("@/views/asset_types/Create.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/asset-type/:id",
    name: "AssetTypeDetail",
    props: true,
    component: () => import("@/views/asset_types/Detail.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/sale",
    name: "sale",
    component: () => import("@/views/sale/Index.vue")
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import("@/views/customer/Customer.vue")
  },
  {
    path: "/customer/create",
    name: "CustomerCreate",
    component: () => import("@/views/customer/CustomerCreate.vue")
  },
  {
    path: "/customer/edit",
    name: "CustomerEdit",
    component: () => import("@/views/customer/CustomerEdit.vue")
  },
  {
    path: "/customer/detail/:id",
    name: "CustomerDetail",
    component: () => import("@/views/customer/CustomerDetail.vue")
  },
  {
    path: "/supplier",
    name: "Suplier",
    component: () => import("@/views/suplier/Suplier.vue")
  },
  {
    path: "/supplier/create",
    name: "SuplierCreate",
    component: () => import("@/views/suplier/SuplierCreate.vue")
  },
  {
    path: "/supplier/edit",
    name: "SuplierEdit",
    component: () => import("@/views/suplier/SuplierEdit.vue")
  },
  {
    path: "/supplier/show/:id",
    name: "SuplierDetail",
    component: () => import("@/views/suplier/SuplierDetail.vue")
  },
  {
    path: "/roles/create",
    name: "RoleCreate",
    component: () => import("@/views/role/Create.vue"),
    meta: { requireAuth: true }
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token");
  if (to.matched.some(record => record.meta.requireAuth) && !loggedIn) {
    next({
      name: "login"
    });
  } else {
    next();
  }
});
export default router;
