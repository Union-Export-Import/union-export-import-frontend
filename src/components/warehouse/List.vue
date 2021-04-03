<template>
  <el-table
    :data="data"
    style="width: 100%"
    v-loading="loading"
    @header-click="assetHeaderClick"
  >
    <el-table-column prop="created_at" label="Date" sortable> </el-table-column>
    <el-table-column prop="asset_name" label="Name" sortable> </el-table-column>
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
    assetHeaderClick(column) {
      this.$emit("asset-header-click", column.property);
    }
  }
};
</script>

<style lang="scss" scoped></style>
