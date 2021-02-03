<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
    <el-breadcrumb-item separator-class="el-icon-arrow-right">User Access Control</el-breadcrumb-item>
    <el-breadcrumb-item>User Edit</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Edit User</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="form.role" filterable placeholder="Select" style="width:397px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form-item label="Phone Number">
          <el-input v-model="form.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="NRC">
          <el-input v-model="form.nrc"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button">Cancel</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="userUpdate" class="submit_button">SUMMIT</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from "@/axios";
import { tokenHeader, lastItemFromUrl } from "../../Helper";
export default {
  beforeMount() {
    this.getUserDetail(this.$route.path);
  },
  methods: {
    getUserDetail: async function (path) {
      let resp = await axios.get(
        `/api/users/${lastItemFromUrl(path)}`,
        tokenHeader(localStorage.getItem("token"))
      );
      this.form = resp.data.data;
    },
    userUpdate: async function () {
      this.payload.name = this.form.name;
      this.payload.email = this.form.email;
      this.payload.email_verified_at = this.form.email_verified_at;
      this.payload.nrc = this.form.nrc;
      this.payload.phone_number = this.form.phone_number;
      this.payload.account_status = this.form.account_status;
      // this.payload.roles = this.form.roles;
      await axios
        .put(
          `/api/users/${lastItemFromUrl(this.$route.path)}`,
          this.payload,
          tokenHeader(localStorage.getItem("token"))
        )
        .then((response) => {
          console.log(response.data);
          this.$router.replace({
            name: "uac",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      labelPosition: "top",
      form: {
        name: "",
        email: "",
        roles: "",
        address: "",
        phone_number: "",
        nrc: "",
      },
      payload: {
        name: null,
        email: null,
        email_verified_at: null,
        nrc: null,
        phone_number: null,
        account_status: null,
        roles: null,
      },
      options: [
        {
          value: "Kyaw Soe Aung",
          label: "Kyaw Soe Aung",
        },
        {
          value: "Aung Myo Oo",
          label: "Aung Myo Oo",
        },
        {
          value: "Min Htet Aung",
          label: "Min Htet Aung",
        },
        {
          value: "Kyaw Soe Ye",
          label: "Kyaw Soe Ye",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
// .form-body {
//   background-color: #f4f4f4;
//   color: #1cbdb4;
// }
// .user-title{
//   padding: 8px;
//   color: #1cbdb4;
// }
// label{
//   color:#1cbdb4;
// }
</style>
