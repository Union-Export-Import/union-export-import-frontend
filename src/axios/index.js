var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "http://localhost:70",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
