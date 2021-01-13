import store from "@/store";
import axios from "@/axios";

store.subscribe(mutation => {
  console.log("subscriber....");
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      if (mutation.payload) {
        console.log("saved token");
        try {
          axios.interceptors.request.use(function(config) {
            config.headers.Authorization = `Bearer ${mutation.payload}`;
            return config;
          });
          localStorage.setItem("token", mutation.payload);
        } catch (e) {
          console.log(e);
        }
      } else {
        axios.interceptors.request.use(function(config) {
          config.headers.Authorization = null;
          return config;
        });
        localStorage.removeItem("token");
      }
      break;
  }
});
