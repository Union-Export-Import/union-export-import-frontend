import axios from "@/axios";

const resource = "/api/assets";
const asset_type_resource = "/api/asset_types";
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export default {
    filterAssets(payload) {
        return axios.post(`${resource}/query`, payload, headers);
    },
    filterAssetTypes(payload) {
        return axios.post(`${asset_type_resource}/query`, payload, headers);
    },
    createAsset(payload) {
        return axios.post(`${resource}`, payload, headers);
    },
};
