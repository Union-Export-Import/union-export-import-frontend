import axios from "@/axios";

const resource = "/api/permissions";
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export default {
    filterPermissions(payload) {
        return axios.post(`${resource}/query`, payload, headers);
    },
};
