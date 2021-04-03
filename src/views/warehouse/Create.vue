<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item separator-class="el-icon-arrow-right"
      >Asset Create</el-breadcrumb-item
    >
    <el-breadcrumb-item>Asset Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Create New Asset</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Name">
          <el-input v-model="form.asset_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form-item label="Asset Type">
          <el-select
            v-model="form.asset_type_id"
            filterable
            placeholder="Select"
            style="width: 397px"
          >
            <el-option
              v-for="item in warehouse.asset_types"
              :key="item.id"
              :label="item.asset_type"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["warehouse"])
  },
  data() {
    return {
      labelPosition: "top",
      form: {
        asset_name: "",
        asset_type_id: ""
      },
      loading: false
    };
  },
  beforeMount() {
    this.$store.dispatch("warehouse/getAssetTypes");
  },
  methods: {
    Back() {
      this.$router.push({ name: "warehouse" });
    },
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("warehouse/createAsset", this.form)
        .then(res => {
          this.loading = false;
          this.$router.push({ name: "warehouse" });
          this.open2(res.data.message, "success");
        })
        .catch(error => {
          this.open2(error.message, "error");
          this.loading = false;
        });
    },
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    }
  }
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
