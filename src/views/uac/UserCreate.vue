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
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-select
            v-model="newUser.roles"
            filterable
            multiple
            placeholder="Select"
            style="width: 397px"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form-item label="Phone Number">
          <el-input v-model="newUser.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="NRC">
          <el-input v-model="newUser.nrc"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input type="textarea" v-model="newUser.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button">Cancel</el-button>
      </el-col>
      <el-col :span="2">
        <submit-button @click="onSubmit" text="Submit"></submit-button>
        <!-- <el-button @click="onSubmit" class="submit_button">SUMMIT</el-button> -->
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import SubmitButton from "@/components/SubmitButton.vue";
import { mapGetters } from "vuex";
import RoleRepository from "../../repository/RoleRepository";
import UserRepository from "../../repository/UserRepository";
import { paginationParams, sortingParams, filter } from "../../Helper";
export default {
  components: {
    "submit-button": SubmitButton,
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  data() {
    return {
      labelPosition: "top",
      newUser: {
        name: "",
        email: "",
        roles: [],
        address: "",
        phone_number: "",
        nrc: "",
      },
      roles: [],
    };
  },
  methods: {
    async onSubmit() {
      await UserRepository.createUsers(this.newUser)
        .then((response) => {
          console.log(response.data);
          this.$router.replace({
            name: "uac",
          });
        })
        .catch((err) => console.log(err));
    },
    getRoles: async function (payload) {
      await RoleRepository.filterRoles(payload)
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    console.log("hello");
    this.getRoles({
      ...sortingParams("id", "asc"),
      ...paginationParams(1, 10000),
      ...{ ...filter([], "AND") },
    });
  },
};
</script>

<style lang="scss" scoped></style>
