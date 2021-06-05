<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item separator-class="el-icon-arrow-right"
      >User Access Control</el-breadcrumb-item
    >
    <el-breadcrumb-item>User Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    ref="newUser"
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Create New User</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Name">
          <el-input v-model="newUser.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="newUser.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-select
            v-model="newUser.roles"
            v-if="role.roles"
            filterable
            multiple
            placeholder="Select"
            style="width: 397px"
          >
            <el-option
              v-for="item in role.roles.data"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form-item label="Phone Number">
          <el-input v-model="newUser.phone_number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="NRC">
          <el-input v-model="newUser.nrc" type="text"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button" @click="onClick"
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
import UserService from "@/services/users/UserService";

export default {
  components: {
    "submit-button": SubmitButton
  },

  computed: {
    ...mapState(["user", "role"])
  },

  created() {
    this.getRoles();
  },

  data() {
    return {
      labelPosition: "top",
      newUser: {
        name: "",
        email: "",
        roles: [],
        phone_number: "",
        nrc: ""
      },
      roles: [],
      loading: false
    };
  },

  methods: {
    ...mapActions("role", ["getRoles"]),

    onSubmit() {
      this.loading = true;
      UserService.createUser(this.newUser)
        .then(response => {
          this.notification(response.data.message, "success");
          this.loading = false;
          this.$router.replace({
            name: "uac"
          });
        })
        .catch(err => {
          this.notification(err.message, "error");
          this.loading = false;
          console.log(err);
        });
    },
    onClick() {
      this.$router.push({
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
