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
            v-if="permission.permissions"
            style="width: 397px"
          >
            <el-option
              v-for="item in permission.permissions.data"
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
import { mapState, mapActions } from "vuex";
import RoleService from "@/services/roles/RoleService";
export default {
  components: {
    "submit-button": SubmitButton
  },

  computed: {
    ...mapState(["permission"])
  },

  created() {
    this.getPermissions();
  },

  data() {
    return {
      labelPosition: "top",
      newRole: {
        title: "",
        permissions: []
      },
      loading: false
    };
  },

  methods: {
    ...mapActions("permission", ["getPermissions"]),

    onSubmit() {
      this.loading = true;
      RoleService.createRole(this.newRole)
        .then(response => {
          this.loading = false;
          this.notification(response.data.message, "success"),
            this.$router.replace({
              name: "uac"
            });
        })
        .catch(err => {
          this.notification(err, "error");
          console.log(err);
        });
    },
    onCancel() {
      this.$router.replace({
        name: "uac"
      });
    },
    notification(message, type) {
      this.$notify({
        title: type,
        message: message,
        type: type
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
