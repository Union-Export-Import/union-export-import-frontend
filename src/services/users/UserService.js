import axios from "@/axios";

const resource = "/api/users";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default {
  filterUsers(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },

  createUser(payload) {
    return axios.post(`${resource}`, payload, headers);
  },

  getUser(id) {
    return axios.get(`${resource}/${id}`, headers);
  },

  updateUser(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },

  deleteUser(id) {
    return axios.delete(`${resource}/${id}`, headers);
  }
};
