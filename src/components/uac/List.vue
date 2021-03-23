<template>
  <el-table @row-click="userDetail" stripe :data="users" style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="Name"
      width="200"
    ></el-table-column>
    <el-table-column prop="email" label="Email" width="230"></el-table-column>
    <el-table-column
      prop="phone_number"
      label="Phone"
      width="200"
    ></el-table-column>
    <el-table-column
      prop="account_status"
      label="Account Status"
      width="200"
    ></el-table-column>
    <el-table-column prop="nrc" label="NRC" width="200"></el-table-column>
    <el-table-column
      prop="created_at"
      label="Created At"
      width="200"
    ></el-table-column>
    <el-table-column label="Operations" width="120">
      <el-button @click="userDetail()" type="text" size="small"
        >Detail</el-button
      >
      <el-button type="text" size="small">Edit</el-button>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="3">
</el-pagination>
</template>

<script>
import {
  paginationParams,
  sortingParams,
} from "../../Helper";
import UserRepository from "../../repository/UserRepository";
import { mapGetters } from "vuex";

export default {
  // data() {
  //   return {
  //     // users: [],
  //     filter: {
  //       ...filter([filterParams("<>", "account_status", "Revoke")], "AND")
  //     }
  //   };
  // },

  computed: {
    ...mapGetters({
      users: "uac/getUsers"
    })
  },

  methods: {
    userDetail(row) {
      this.$router.push({ name: "UserDetail", params: { id: row.id } });
    },

    getUsers: async function(payload) {
      await UserRepository.filterUsers(payload)
        .then(res => {
          this.$store.commit("uac/ADD_UAC_DATA", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  beforeMount() {
    this.getUsers({
      ...sortingParams("id", "asc"),
      ...paginationParams(1, 3),
      ...this.filter
    });
  }
};
</script>
