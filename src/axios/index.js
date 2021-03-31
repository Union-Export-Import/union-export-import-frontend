var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
