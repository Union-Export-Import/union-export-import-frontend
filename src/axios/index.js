var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "http://re-union.test",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
