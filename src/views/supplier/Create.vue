<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item separator-class="el-icon-arrow-right"
      >Supplier Create</el-breadcrumb-item
    >
    <el-breadcrumb-item>Supplier Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Create New Supplier</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Name">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Company Name">
          <el-input v-model="form.company_name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-form-item label="Phone Number">
          <el-input v-model="form.phone_number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Bank Acc">
          <el-input v-model="form.bank_account" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Supplied Product">
          <el-input v-model="form.supplied_product" type="text"></el-input>
        </el-form-item>
        <el-form-item label="remark">
          <el-input v-model="form.remark" type="text"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button" @click="Back"
          >Cancel</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button class="submit_button" @click="onSubmit" v-loading="loading"
          >SUMMIT</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["supplier"])
  },
  data() {
    return {
      labelPosition: "top",
      form: {
        name: "",
        company_name: "",
        address: "",
        email: "",
        phone_number: "",
        bank_account: "",
        supplied_product: "",
        remark: ""
      },
      loading: false
    };
  },
  methods: {
    ...mapActions("supplier", ["createSupplier"]),
    Back() {
      this.$router.push({ name: "supplier" });
    },
    onSubmit() {
      this.loading = true;
      this.createSupplier(this.form)
        .then(res => {
          this.loading = false;
          this.$router.push({ name: "Supplier" });
          this.notification(res.data.message, "success");
        })
        .catch(error => {
          this.notification(error.message, "error");
          this.loading = false;
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
