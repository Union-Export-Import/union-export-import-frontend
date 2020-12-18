<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item separator-class="el-icon-arrow-right"
      >Customer</el-breadcrumb-item
    >
    <el-breadcrumb-item>Customer Edit</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="Edit-Customer">Edit Customer</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
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
      <el-col :span="10" :offset="1">
        <el-form-item label="Customer Name">
          <el-input v-model="form.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="Tel/Fax Number">
          <el-input v-model="form.fax_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
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
        name: "kyaw",
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
    CustomerCreate() {
      router.push({ name: "CustomerCreate" });
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
