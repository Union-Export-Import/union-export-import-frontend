var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "http://union-export-import.me",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
