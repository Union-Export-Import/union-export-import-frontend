import axios from "@/axios";

const resource = "/api/categories";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default {
  filterCategories(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },

  createCategory(payload) {
    return axios.post(`${resource}`, payload, headers);
  },

  getCategory(id) {
    return axios.get(`${resource}/${id}`, headers);
  },

  updateCategory(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },

  deleteCategory(id) {
    return axios.delete(`${resource}/${id}`, headers);
  }
};
