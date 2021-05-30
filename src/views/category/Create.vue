<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
    <el-breadcrumb-item separator-class="el-icon-arrow-right">Category Create</el-breadcrumb-item>
    <el-breadcrumb-item>Category Create</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    class="form-body"
  >
    <h1 :span="3" class="user-title">Create New Category</h1>
    <el-row :span="16">
      <el-col :span="10" :offset="1">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
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
    ...mapState(["category"]),
  },
  data() {
    return {
      labelPosition: "top",
      form: {
        name: ""
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions("category", ["createCategory"]),
    Back() {
      this.$router.push({ name: "category" });
    },
    onSubmit() {
      this.loading = true;
      this.createCategory(this.form)
        .then((res) => {
          console.log("************");
          this.loading = false;
          this.$router.push({ name: "Category" });
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

