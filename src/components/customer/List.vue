<template>
  <el-table
    @row-click="customerDetail"
    v-loading="loading"
    stripe
    :data="data"
    style="width: 100%"
    @header-click="headerClick"
  >
    <el-table-column fixed prop="name" label="Name" width="200"></el-table-column>
    <el-table-column prop="email" label="Email" width="230"></el-table-column>
    <el-table-column prop="phone_number" label="Phone" width="200"></el-table-column>
    <el-table-column prop="address" label="Address" width="200"></el-table-column>
    <el-table-column prop="company_name" label="Company Name" width="200"></el-table-column>
    <el-table-column prop="created_at" label="Created At" width="200"></el-table-column>
    <el-table-column label="Operations" width="120">
      <el-button @click="customerDetail()" type="text" size="small">Detail</el-button>
      <el-button @click="customerEdit()" type="text" size="small">Edit</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    customerDetail(row) {
      this.$router.push({ name: "CustomerDetail", params: { id: row.id } });
    },
    headerClick(column) {
      this.$emit("customer-header-click", column.property);
    },
  },
};
</script>
