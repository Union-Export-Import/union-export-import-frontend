import axios from "@/axios";
const resource = "/api/asset_types";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default {
  filterAssetType(payload) {
    return axios.post(`${resource}/query`, payload, headers);
  },
  createAssetType(payload) {
    return axios.post(`${resource}`, payload, headers);
  },
  updateAsset(payload, id) {
    return axios.put(`${resource}/${id}`, payload, headers);
  },
  getAssetType(id) {
    return axios.get(`${resource}/${id}`, headers);
  }
};
