<template>
  <el-table @row-click="userDetail" stripe :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="200"></el-table-column>
    <el-table-column prop="email" label="Email" width="230"></el-table-column>
    <el-table-column prop="phone_number" label="Phone" width="200"></el-table-column>
    <el-table-column prop="account_status" label="Account Status" width="200"></el-table-column>
    <el-table-column prop="nrc" label="NRC" width="200"></el-table-column>
    <el-table-column prop="created_at" label="Created At" width="200"></el-table-column>
    <el-table-column label="Operations" width="120">
      <el-button @click="userDetail()" type="text" size="small">Detail</el-button>
      <el-button type="text" size="small">Edit</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "@/axios";
import {
  paginationParams,
  sortingParams,
  filterParams,
  filter,
} from "../../Helper";
export default {
  methods: {
    userDetail(row) {
      this.$router.push({ name: "UserDetail", params: { id: row.id } });
    },
    getUsers: async function (payload) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      console.log("usersss");
      await axios
        .post("/api/users/query", payload, { headers })
        .then((response) => {
          console.log(response.data.data);
          this.tableData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  data() {
    return {
      tableData: [],
      filter: {
        ...filter([filterParams("<>", "account_status", "Revoke")], "AND"),
      },
    };
  },
  beforeMount() {
    this.getUsers({
      ...sortingParams("id", "asc"),
      ...paginationParams(1, 20),
      ...this.filter,
    });
  },
};
</script>
