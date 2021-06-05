<template>
  <el-drawer
    :model-value="roleFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
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
import { mapState, mapMutations } from "vuex";
import roleService from "@/services/roles/RoleService";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        title: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapState(["role"]),

    roleFilterOpen() {
      return this.role.open;
    }
  },

  methods: {
    ...mapMutations("role", ["ROLE_FILTER", "SET_ROLES"]),

    // ...mapActions("role"),

    filterBoxClose() {
      this.ROLE_FILTER();
    },

    clearForm() {
      console.log("Clear Form");
    },

    getRoles(payload) {
      roleService
        .filterRoles(payload)
        .then(response => {
          this.SET_ROLES(response.data);
          this.ROLE_FILTER();
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },

    filterRoles() {
      this.loading = true;
      const { title } = this.form;
      const nameParams = title
        ? filterParams("LIKE", "title", `%${title}%`)
        : null;
      const mappedData = [{ ...nameParams }];
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
