import axios from "@/axios";

const resource = "/api/roles";
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export default {
    filterRoles(payload) {
        return axios.post(`${resource}/query`, payload, headers);
    },
    createRole(payload) {
        return axios.post(`${resource}`, payload, headers);
    },
};
