<template>
  <el-table
    v-if="data"
    stripe
    :data="data"
    v-loading="loading"
    style="width: 100%"
    @header-click="roleHeaderClick"
  >
    <el-table-column prop="title" label="Name" width="180" sortable></el-table-column>
    <el-table-column prop="permission" label="Permissions">
      <template v-slot="scope">
        {{
        getPermissionComma(scope.row.permissions)
        }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getPermissionComma(permissions) {
      return Array.prototype.map
        .call(permissions, function (item) {
          return item.permission_name;
        })
        .join(", ");
    },
    roleHeaderClick(column) {
      if (column.property != "permission") {
        this.$emit("roleHeaderClick", column.property);
      }
    },
  },
};
</script>
