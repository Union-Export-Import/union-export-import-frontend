import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import 'nprogress/nprogress.css'

require("@/store/subscriber");

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  createApp({
    render() {
      return h(App);
    },
  })
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount("#app");
});
