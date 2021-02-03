<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
    <el-breadcrumb-item separator-class="el-icon-arrow-right">User Access Control</el-breadcrumb-item>
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
          <el-select v-model="newUser.roles" filterable multiple placeholder="Select" style="width:397px;">
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
import axios from "@/axios";
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
        role: "",
        address: "",
        phone_number: "",
        nrc: "",
      },
      options: [
        {
          value: "1",
          label: "User Access Control",
        },
        {
          value: "2",
          label: "User Access Control",
        },
        {
          value: "3",
          label: "User Access Control",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      let header = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios.post("/api/users", this.newUser, header).then((response) => {
        console.log(response.data);
        this.$router.replace({
          name: "uac",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
