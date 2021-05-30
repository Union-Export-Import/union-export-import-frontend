import axios from "@/axios";

const resource = "/api/customers";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default {
  filterCustomers(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },

  createCustomer(payload) {
    return axios.post(`${resource}`, payload, headers);
  },

  getCustomer(id) {
    return axios.get(`${resource}/${id}`, headers);
  },

  updateCustomer(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },

  deleteCustomer(id) {
    return axios.delete(`${resource}/${id}`, headers);
  }
};
