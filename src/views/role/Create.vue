<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item separator-class="el-icon-arrow-right"
      >User Access Control</el-breadcrumb-item
    >
    <el-breadcrumb-item>Role Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    ref="newUser"
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Create New Role</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Role">
          <el-input v-model="newRole.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form-item label="Permissions">
          <el-select
            v-model="newRole.permissions"
            filterable
            multiple
            placeholder="Select"
            style="width: 397px"
          >
            <el-option
              v-for="item in permissions"
              :key="item.id"
              :label="item.permission_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button" @click="onCancel"
          >Cancel</el-button
        >
      </el-col>
      <el-col :span="2">
        <submit-button
          @click="onSubmit"
          text="Submit"
          v-loading="loading"
        ></submit-button>
        <!-- <el-button @click="onSubmit" class="submit_button">SUMMIT</el-button> -->
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import SubmitButton from "@/components/SubmitButton.vue";
import { mapGetters } from "vuex";
import RoleService from "@/services/roles/RoleService";
import PermissionRepository from "@/repository/PermissionRepository";
import { paginationParams, sortingParams, filter } from "@/Helper";
export default {
  components: {
    "submit-button": SubmitButton
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  data() {
    return {
      labelPosition: "top",
      newRole: {
        title: "",
        permissions: []
      },
      permissions: [],
      loading: false
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      await RoleService.createRole(this.newRole)
        .then(response => {
          console.log(response);
          this.loading = false;
          this.open2(response.data.message, "success"),
            this.$router.replace({
              name: "uac"
            });
        })
        .catch(err => {
          this.open2(err, "error");
          console.log(err);
        });
    },
    onCancel() {
      this.$router.replace({
        name: "uac"
      });
    },
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },
    getPermissions: async function(payload) {
      await PermissionRepository.filterPermissions(payload)
        .then(res => {
          this.permissions = res.data.data;
        })
        .catch(err => {
          this.open2(err.message, "error");
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getPermissions({
      ...sortingParams("id", "asc"),
      ...paginationParams(1, 1000),
      ...{ ...filter([], "AND") }
    });
  }
};
</script>

<style lang="scss" scoped></style>
