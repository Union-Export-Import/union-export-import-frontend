<template>
  <el-table
    :data="data"
    style="width: 100%"
    v-loading="loading"
    @header-click="assetTypeHeaderClick"
  >
    <el-table-column type="index" label="#"> </el-table-column>
    <el-table-column prop="created_at" label="Date" sortable> </el-table-column>
    <el-table-column prop="asset_type" label="Name" sortable> </el-table-column>
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
    assetTypeHeaderClick(column) {
      this.$emit("asset-type-header-click", column.property);
    },
    handleClick(id) {
      this.$router.push({ name: "AssetTypeDetail", params: { id: id } });
    },
    editClick(id) {
      this.$router.push({ name: "AssetTypeEdit", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped></style>
