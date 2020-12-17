<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item separator-class="el-icon-arrow-right"
      >Customer</el-breadcrumb-item
    >
    <el-breadcrumb-item>Customer Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    :model="formLabelAlign"
    class="form-body"
  >
    <br />
    <h1 class="user-title">New Customer</h1>
    <br />
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Destination">
          <el-input v-model="form.destination"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Customer Name">
          <el-input v-model="form.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="Tel/Fax Number">
          <el-input v-model="form.fax_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end" class="ok_cancel_button_gp">
      <el-col :span="2">
        <el-button type="text" class="cancel_button" @click="Customer"
          >Cancel</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button class="submit_button">SUMMIT</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import router from "../../router";
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        name: "",
        email: "",
        destination: "",
        customer_name: "",
        fax_number: "",
      },
    };
  },
  methods: {
    Customer() {
      router.push({ path: "/customer" });
    },
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
