import axios from "@/axios";

const resource = "/api/users";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export default {
  filterUsers(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },

  createUsers(payload) {
    return axios.post(`${resource}`, payload, headers);
  },

  getUserById(id) {
    return axios.get(`${resource}/${id}`, headers);
  },

  updateUser(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },

  deleteUser(id) {
    return axios.delete(`${resource}/${id}`, headers);
  },
};
