<template>
  <el-drawer
    :model-value="categoryFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
    @closeFilterSlider="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">Category Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <div class="clear">
        <p @click="clearForm">Clear</p>
      </div>
      <el-button
        @click="filterCategories"
        class="filter-button"
        v-loading="loading"
        >Filter</el-button
      >
    </el-form>
  </el-drawer>
</template>

<script>
import {
  paginationParams,
  sortingParams,
  filterParams,
  filter
} from "@/Helper";
// import axios from "@/axios";
import filterService from "@/services/category/CategoryService";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        category_name: "",
        email: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapState(["category"]),
    categoryFilterOpen() {
      return this.category.open;
    }
  },

  methods: {
    ...mapMutations("category", [
      "SET_CATEGORIES",
      "HANDLE_CATEGORY_FILTER_BOX"
    ]),
    filterBoxClose() {
      this.HANDLE_CATEGORY_FILTER_BOX();
    },
    clearForm() {
      console.log("Clear Form");
    },
    getCategories: async function(payload) {
      await filterService
        .filterCategories(payload)
        .then(response => {
          this.SET_CATEGORIES(response.data);
          this.HANDLE_CATEGORY_FILTER_BOX();
          this.loading = false;
        })
        .catch(e => {
          this.open2(e.message, "error");
          this.loading = false;
        });
    },
    filterCategories() {
      this.loading = true;
      const {
        name,
        company_name,
        address,
        email,
        phone_number,
        bank_acc,
        remark
      } = this.form;
      const categoryNameParams = name
        ? filterParams("LIKE", "name", `%${name}%`)
        : null;
      const companyNameParams = company_name
        ? filterParams("LIKE", "company_name", `%${company_name}%`)
        : null;
      const addressParams = address
        ? filterParams("LIKE", "address", `%${address}%`)
        : null;
      const emailParams = email
        ? filterParams("LIKE", "email", `%${email}%`)
        : null;
      const phoneNumberParams = phone_number
        ? filterParams("LIKE", "phone_number", `%${phone_number}%`)
        : null;
      const bankAccParams = bank_acc
        ? filterParams("LIKE", "bank_acc", `%${bank_acc}%`)
        : null;
      const remarkParams = remark
        ? filterParams("LIKE", "remark", `%${remark}%`)
        : null;
      const mappedData = [
        { ...categoryNameParams },
        { ...companyNameParams },
        { ...addressParams },
        { ...emailParams },
        { ...phoneNumberParams },
        { ...bankAccParams },
        { ...remarkParams }
      ];
      let filterMap = [];
      mappedData.forEach(function(element) {
        if (Object.keys(element).length != 0) {
          filterMap.push(element);
        }
      });
      this.getCategories({
        ...sortingParams("id", "asc"),
        ...paginationParams(1, 10),
        ...filter(filterMap, "AND")
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
