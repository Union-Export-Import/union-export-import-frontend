import axios from "@/axios";

const resource = "/api/assets";
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export default {
    filterAssets(payload) {
        return axios.post(`${resource}/query`, payload, headers);
    },
};
