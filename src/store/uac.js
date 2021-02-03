import Vue from "vue";
export const store = Vue.observable({
  data: [],
});
export const mutations = {
  setData(payload) {
    store.data = payload;
  },
};
