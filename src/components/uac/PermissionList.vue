<template>
  <el-table stripe :data="data" style="width: 100%">
    <el-table-column prop="title" label="Date" width="180"></el-table-column>
    <el-table-column prop="title" label="Name" width="180"></el-table-column>
    <el-table-column prop="title" label="Address"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
