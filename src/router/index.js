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
    props: true,
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
    component: () => import("@/views/customer/Index.vue")
  },
  {
    path: "/customer/create",
    name: "CustomerCreate",
    component: () => import("@/views/customer/Create.vue")
  },
  {
    path: "/customer/edit/:id",
    name: "CustomerEdit",
    component: () => import("@/views/customer/Edit.vue")
  },
  {
    path: "/customer/detail/:id",
    name: "CustomerDetail",
    component: () => import("@/views/customer/Detail.vue")
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: () => import("@/views/supplier/Index.vue")
  },
  {
    path: "/supplier/create",
    name: "SupplierCreate",
    component: () => import("@/views/supplier/Create.vue")
  },
  {
    path: "/supplier/edit",
    name: "SupplierEdit",
    component: () => import("@/views/supplier/Edit.vue")
  },
  {
    path: "/supplier/show/:id",
    name: "SupplierDetail",
    component: () => import("@/views/supplier/Detail.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/views/category/Index.vue")
  },
  {
    path: "/category/create",
    name: "category-create",
    component: () => import("@/views/category/Create.vue")
  },
  {
    path: "/category/edit/:id",
    name: "category-edit",
    component: () => import("@/views/category/Edit.vue")
  },
  {
    path: "/category/detail/:id",
    name: "category-detail",
    component: () => import("@/views/category/Detail.vue")
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
