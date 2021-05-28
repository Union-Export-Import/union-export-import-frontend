<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
    <el-breadcrumb-item separator-class="el-icon-arrow-right">Customer</el-breadcrumb-item>
    <el-breadcrumb-item>Customer Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Create New Customer</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Name">
          <el-input v-model="newCustomer.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="newCustomer.email"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="newCustomer.address"></el-input>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="newCustomer.remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form-item label="Company Name">
          <el-input v-model="newCustomer.company_name"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="newCustomer.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="Bank Account">
          <el-input v-model="newCustomer.bank_acc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button" @click="back">Cancel</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="onSubmit" class="submit_button">SUMMIT</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import CustomerRepository from "../../repository/CustomerRepository";
import router from "../../router";
export default {
  data() {
    return {
      labelPosition: "top",
      newCustomer: {
        name: "",
        company_name: "",
        address: "",
        email: "",
        phone_number: "",
        bank_acc: "",
        remark: "",
      },
      loading: false,
    };
  },
  methods: {
    back() {
      router.push({ path: "/customer" });
    },
    async onSubmit() {
      this.loading = true;
      await CustomerRepository.createCustomer(this.newCustomer)
        .then((response) => {
          this.open2(response.data.message, "success");
          this.loading = false;
          this.$router.replace({
            name: "Customer",
          });
        })
        .catch((err) => {
          this.open2(err.message, "error");
          console.log(err);
        });
    },
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type,
      });
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
