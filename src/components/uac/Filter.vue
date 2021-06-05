<template>
  <el-drawer
    :model-value="userFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">User Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Phone Number">
        <el-input v-model="form.phone_number"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Creation Date">
        <el-row>
          <el-col :span="11">
            <el-date-picker
              style="width:100%"
              v-model="form.start_created_at"
              type="date"
              placeholder="Pick a Date"
              format="YYYY/MM/DD"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              style="width:100%"
              v-model="form.end_created_at"
              type="date"
              label-width="33%"
              placeholder="Pick a Date"
              format="YYYY/MM/DD"
            ></el-date-picker>
          </el-col>
        </el-row>
      </el-form-item>
      <el-button @click="filterUser" class="filter-button" v-loading="loading"
        >Filter</el-button
      >
    </el-form>
  </el-drawer>
</template>

<script>
import {
  paginationParams,
  sortingParams,
  filterParams,
  filter
} from "@/Helper";
// import axios from "@/axios";
import userService from "@/services/users/UserService";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        name: "",
        phone_number: "",
        email: "",
        start_created_at: "",
        end_created_at: "",
        created_at: "",
        updated_at: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapState(["user"]),
    userFilterOpen() {
      return this.user.open;
    }
  },

  methods: {
    ...mapMutations("user", ["SET_USERS", "USER_FILTER"]),
    filterBoxClose() {
      this.USER_FILTER();
    },
    clearForm() {
      console.log("Clear Form");
    },
    getUsers(payload) {
      userService
        .filterUsers(payload)
        .then(response => {
          this.SET_USERS(response.data);
          this.USER_FILTER();
          this.loading = false;
        })
        .catch(e => {
          this.open2(e.message, "error");
          this.loading = false;
        });
    },
    filterUser() {
      this.loading = true;
      const {
        name,
        phone_number,
        email,
        start_created_at,
        end_created_at
      } = this.form;
      const nameParams = name
        ? filterParams("LIKE", "name", `%${name}%`)
        : null;
      const phoneNumberParams = phone_number
        ? filterParams("LIKE", "phone_number", `%${phone_number}%`)
        : null;
      const emailParams = email
        ? filterParams("LIKE", "email", `%${email}%`)
        : null;
      const createAtParams = start_created_at
        ? filterParams(
            ">",
            "created_at",
            `${this.formatDate(start_created_at)}`
          )
        : null;
      const updatedAtParams = end_created_at
        ? filterParams("<", "created_at", `${this.formatDate(end_created_at)}`)
        : null;

      const mappedData = [
        { ...nameParams },
        { ...phoneNumberParams },
        { ...emailParams },
        { ...createAtParams },
        { ...updatedAtParams }
      ];
      let filterMap = [];
      mappedData.forEach(function(element) {
        if (Object.keys(element).length != 0) {
          filterMap.push(element);
        }
      });
      this.getUsers({
        ...sortingParams("id", "asc"),
        ...paginationParams(1, 10),
        ...filter(filterMap, "AND")
      });
    },
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    }
  }
};
</script>
