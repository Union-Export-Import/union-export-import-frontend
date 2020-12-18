<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item :to="Customer"> Customer</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-button class="rear_bg " @click="CustomerCreate">New Customer</el-button>
    <el-tab-pane label="Customer">
      <CustomerList />
    </el-tab-pane>
    <!-- <el-tab-pane label="Roles & Permission">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="address" label="Address"> </el-table-column>
      </el-table>
    </el-tab-pane> -->
  </el-tabs>
</template>

<script>
import CustomerList from "./CustomerList";
import router from "../../router";
export default {
  components: {
    CustomerList,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
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
