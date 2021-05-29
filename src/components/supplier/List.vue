<template>
  <el-table
    :data="data"
    style="width: 100%"
    v-loading="loading"
    @header-click="supplierHeaderClick"
  >
    <el-table-column type="index" label="#"> </el-table-column>
    <el-table-column prop="created_at" label="Created At" sortable> </el-table-column>
    <el-table-column prop="name" label="Name" sortable> </el-table-column>
    <el-table-column prop="company_name" label="Company Name" sortable> </el-table-column>
    <el-table-column prop="address" label="Address" sortable> </el-table-column>
    <el-table-column prop="email" label="Email" sortable> </el-table-column>
    <el-table-column prop="phone_number" label="Phone Number" sortable> </el-table-column>
    <el-table-column prop="supplied_product" label="Supplied Product" sortable> </el-table-column>
    <el-table-column prop="remark" label="Remark" sortable> </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="small"
          >Detail</el-button
        >
        <el-button type="text" size="small" @click="editClick(scope.row.id)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
    <!-- <el-table-column prop="address" label="Address"> </el-table-column> -->
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    loading: {
      type: Boolean
    }
  },
  methods: {
    supplierHeaderClick(column) {
      this.$emit("supplier-header-click", column.property);
    },
    handleClick(id) {
      this.$router.push({ name: "SupplierDetail", params: { id: id } });
    },
    editClick(id) {
      this.$router.push({ name: "SupplierEdit", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped></style>
