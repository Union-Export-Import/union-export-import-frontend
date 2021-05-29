<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
    <el-breadcrumb-item separator-class="el-icon-arrow-right">Supplier Create</el-breadcrumb-item>
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
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Company Name">
          <el-input v-model="form.company_name"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-form-item label="Phone Number">
          <el-input v-model="form.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="Bank Acc">
          <el-input v-model="form.bank_account"></el-input>
        </el-form-item>
        <el-form-item label="Supplied Product">
          <el-input v-model="form.supplied_product"></el-input>
        </el-form-item>
        <el-form-item label="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button type="text" class="cancel_button" @click="Back">Cancel</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="submit_button" @click="onSubmit" v-loading="loading">SUMMIT</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["supplier"]),
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
        remark: "",
      },
      loading: false,
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
        .then((res) => {
          console.log("************");
          this.loading = false;
          this.$router.push({ name: "Supplier" });
          this.open2(res.data.message, "success");
        })
        .catch((error) => {
          this.open2(error.message, "error");
          this.loading = false;
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

