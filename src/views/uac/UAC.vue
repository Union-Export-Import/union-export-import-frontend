<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>User Access Control</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-row>
      <el-col :span="18"></el-col>
      <el-col :span="6">
        <el-button type="primary" :to="{ name: 'UserEdit' }"
          >New User</el-button
        ></el-col
      >
    </el-row>
    <el-tab-pane label="Users">
      <UserList></UserList>
    </el-tab-pane>
    <el-tab-pane label="Roles & Permission">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import UserList from "@/views/uac/UserList.vue";
export default {
  components: {
    UserList
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
      ]
    };
  }
};
</script>
