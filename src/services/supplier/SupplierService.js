import axios from "@/axios";

const resource = "/api/suppliers";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default {
  filterSuppliers(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },

  createSupplier(payload) {
    return axios.post(`${resource}`, payload, headers);
  },

  getSupplier(id) {
    return axios.get(`${resource}/${id}`, headers);
  },

  updateSupplier(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },

  deleteSupplier(id) {
    return axios.delete(`${resource}/${id}`, headers);
  }
};
