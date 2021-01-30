import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
const Home = () => import("../views/Home.vue");
const Login = () => import("../views/auth/Login.vue");
const UAC = () => import("../views/uac/UAC.vue");
const Warehouse = () => import("../views/warehouse/Index.vue");
const Sale = () => import("../views/sale/Index.vue");
const Product = () => import("../views/product/Index.vue");
const Customer = () => import("../views/customer/Customer.vue");
const UserCreate = () => import("../views/uac/UserCreate.vue");
const UserEdit = () => import("../views/uac/UserEdit.vue");
const CustomerCreate = () => import("../views/customer/CustomerCreate.vue");
const CustomerEdit = () => import("../views/customer/CustomerEdit.vue");
const Suplier = () => import("../views/suplier/Suplier.vue");
const SuplierCreate = () => import("../views/suplier/SuplierCreate.vue");
const SuplierEdit = () => import("../views/suplier/SuplierEdit.vue");
const SuplierDetail = () => import("../views/suplier/SuplierList.vue");
const ChangePassword = () => import("../views/auth/ChangePassword");
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
                return next({
                    name: "login",
                });
            } else if (
                store.getters["auth/authenticated"].account_status == "Init"
            ) {
                console.log("*ABC*");
                return next({
                    name: "change-password",
                });
            }

            next();
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
            console.log("*ABC*");
            console.log(!store.getters["auth/authenticated"]);
            console.log("JFIOEJIOFJIO");
            console.log(store.getters["auth/authenticated"]);
            if (store.getters["auth/authenticated"]) {
                return next({
                    name: "home",
                });
            }

            next();
        },
    },
    {
        path: "/change-password",
        name: "change-password",
        component: ChangePassword,
    },
    {
        path: "/user-access-control",
        name: "uac",
        component: UAC,
    },
    {
        path: "/product",
        name: "product",
        component: Product,
    },
    {
        path: "/warehouse",
        name: "warehouse",
        component: Warehouse,
    },
    {
        path: "/sale",
        name: "sale",
        component: Sale,
    },
    {
        path: "/customer",
        name: "Customer",
        component: Customer,
    },
    {
        path: "/user-access-control/create",
        name: "UserCreate",
        component: UserCreate,
    },
    {
        path: "/user-access-control/edit",
        name: "UserEdit",
        component: UserEdit,
    },
    {
        path: "/customer/create",
        name: "CustomerCreate",
        component: CustomerCreate,
    },
    {
        path: "/customer/edit",
        name: "CustomerEdit",
        component: CustomerEdit,
    },
    {
        path: "/suplier",
        name: "Suplier",
        component: Suplier,
    },
    {
        path: "/suplier/create",
        name: "SuplierCreate",
        component: SuplierCreate,
    },
    {
        path: "/suplier/detail",
        name: "SuplierDetail",
        component: SuplierDetail,
    },
    {
        path: "/suplier/edit",
        name: "SuplierEdit",
        component: SuplierEdit,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
