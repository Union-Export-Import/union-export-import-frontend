import axios from "@/axios";

const resource = "/api/assets";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default {
  filterAssets(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },
  createAsset(payload) {
    return axios.post(`${resource}`, payload, headers);
  },
  updateAsset(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },
  getAsset(id) {
    return axios.get(`${resource}/${id}`, headers);
  }
};
