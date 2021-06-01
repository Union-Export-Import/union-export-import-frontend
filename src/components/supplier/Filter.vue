<template>
  <el-drawer
    :model-value="supplierFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">Supplier Filter</h1>
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
      <el-form-item label="Phone Number">
        <el-input v-model="form.phone_number"></el-input>
      </el-form-item>
      <el-form-item label="Bank Account">
        <el-input v-model="form.bank_acc"></el-input>
      </el-form-item>
      <el-form-item label="Remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <div class="clear">
        <p @click="clearForm">Clear</p>
      </div>
      <el-button
        @click="filterSuppliers"
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
import filterService from "@/services/supplier/SupplierService";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        supplier_name: "",
        email: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapState(["supplier"]),
    supplierFilterOpen() {
      return this.supplier.open;
    }
  },

  methods: {
    ...mapMutations("supplier", [
      "SET_SUPPLIERS",
      "HANDLE_SUPPLIER_FILTER_BOX"
    ]),
    filterBoxClose() {
      this.HANDLE_SUPPLIER_FILTER_BOX();
    },
    clearForm() {
      console.log("Clear Form");
    },
    getSuppliers: async function(payload) {
      await filterService
        .filterSuppliers(payload)
        .then(response => {
          this.SET_SUPPLIERS(response.data);
          this.HANDLE_SUPPLIER_FILTER_BOX();
          this.loading = false;
        })
        .catch(e => {
          this.open2(e.message, "error");
          this.loading = false;
        });
    },
    filterSuppliers() {
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
      const supplierNameParams = name
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
        { ...supplierNameParams },
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
      this.getSuppliers({
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
