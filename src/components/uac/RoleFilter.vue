<template>
  <el-drawer
    :model-value="roleFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
    @closeFilterSlider="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">Role Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <div class="clear">
        <p @click="clearForm">Clear</p>
      </div>
      <el-button @click="filterRoles" class="filter-button" v-loading="loading"
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
import RoleRepository from "@/repository/RoleRepository";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        title: "",
        email: ""
      },
      loading: false
    };
  },

  computed: {
    roleFilterOpen() {
      return this.$store.getters.filterRoleOpen;
    }
  },

  methods: {
    filterBoxClose() {
      this.$store.commit("HANDLE_ROLE_FILTER_BOX");
    },
    clearForm() {
      console.log("Clear Form");
    },
    getRoles: async function(payload) {
      await RoleRepository.filterRoles(payload)
        .then(response => {
          console.log("Response", response.data);
          this.$store.commit("uac/ADD_ROLE_DATA", response.data);
          this.$store.commit("HANDLE_ROLE_FILTER_BOX");
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    filterRoles() {
      this.loading = true;
      const { title, email } = this.form;
      const nameParams = title
        ? filterParams("LIKE", "title", `%${title}%`)
        : null;
      const emailParams = email
        ? filterParams("LIKE", "email", `%${email}%`)
        : null;
      const mappedData = [{ ...nameParams }, { ...emailParams }];
      let filterMap = [];
      mappedData.forEach(function(element) {
        if (Object.keys(element).length != 0) {
          filterMap.push(element);
        }
      });
      this.getRoles({
        ...sortingParams("id", "asc"),
        ...paginationParams(1, 10),
        ...filter(filterMap, "AND")
      });
    }
  }
};
</script>
