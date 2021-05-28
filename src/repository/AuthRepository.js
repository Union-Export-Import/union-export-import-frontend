import axios from "@/axios";

const resource = "/api";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export default {
  logout() {
    return axios.get(`${resource}/logout`, headers);
  },

  login(payload) {
    return axios.post(`${resource}/login`, payload);
  },

  tokenRefresh() {
    return axios.get(`${resource}/refresh`, headers);
  },

  me() {
    return axios.get(`${resource}/me`, headers);
  },

  changePassword(payload) {
    return axios.post(`${resource}/change-password`, payload, headers);
  },

  forgetPassword(payload) {
    return axios.post(`${resource}/forget-password`, payload);
  },
};
