import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

require("@/store/subscriber");

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount("#app");
});
