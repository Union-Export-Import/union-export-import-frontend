import axios from "@/axios";

export default class UserAccessModuleServices {
  constructor() {
    this.url = "/uac";
    this.header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  getRoles = payload => axios.get("/api/roles/query", payload, this.header);
}
