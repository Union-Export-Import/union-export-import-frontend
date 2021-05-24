<template>
  <el-table
    v-loading="loading"
    stripe
    :data="data"
    style="width: 100%"
    @header-click="headerClick"
    @row-click="userDetail"
  >
    <el-table-column
      fixed
      prop="name"
      label="Name"
      sortable
      width="200"
    ></el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      sortable
      width="230"
    ></el-table-column>
    <el-table-column
      prop="phone_number"
      label="Phone"
      sortable
      width="200"
    ></el-table-column>
    <el-table-column
      prop="account_status"
      label="Account Status"
      sortable
      width="200"
    ></el-table-column>
    <el-table-column
      prop="nrc"
      label="NRC"
      sortable
      width="200"
    ></el-table-column>
    <el-table-column
      prop="created_at"
      label="Created At"
      sortable
      width="200"
    ></el-table-column>
    <el-table-column label="Operations" width="120">
      <el-button @click="userDetail()" type="text" size="small"
        >Detail</el-button
      >
      <el-button type="text" size="small" @click="userEdit">Edit</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    userDetail(row) {
      this.$router.push({ name: "UserDetail", params: { id: row.id } });
    },
    headerClick(column) {
      this.$emit("user-header-click", column.property);
    },
    userEdit() {
      this.$router.push({ name: "UserEdit" });
    }
  }
};
</script>
