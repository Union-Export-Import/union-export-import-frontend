var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "http://128.199.153.54:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
