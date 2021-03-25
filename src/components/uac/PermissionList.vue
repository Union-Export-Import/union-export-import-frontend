<template>
  <el-table stripe :data="roles" style="width: 100%">
    <el-table-column prop="created_at" label="Date" width="180"></el-table-column>
    <el-table-column prop="title" label="Name" width="180"></el-table-column>
    <el-table-column label="Permissions">
      <template v-slot="scope">{{getPermissionComma(scope.row.permissions)}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import { paginationParams, sortingParams } from "@/Helper";
import RoleRepository from "@/repository/RoleRepository";
import { mapGetters } from "vuex";
import { filter } from "../../Helper";
export default {
  props: {
    data: {
      type: Array,
      required: true,
      filter: [],
    },
  },
  computed: {
    ...mapGetters({
      roles: "uac/getRoles",
    }),
  },
  methods: {
    getRole: async function (payload) {
      await RoleRepository.filterRoles(payload)
        .then((res) => {
          this.$store.commit("uac/GET_ROLE_DATA", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPermissionComma(permissions) {
      return Array.prototype.map
        .call(permissions, function (item) {
          return item.permission_name;
        })
        .join(", ");
    },
  },
  beforeMount() {
    this.getRole({
      ...sortingParams("id", "asc"),
      ...paginationParams(1, 1),
      ...filter([], "AND"),
    });
  },
};
</script>
