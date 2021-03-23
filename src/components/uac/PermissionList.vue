<template>
  <el-table stripe :data="roles" style="width: 100%">
    <el-table-column
      prop="created_at"
      label="Date"
      width="180"
    ></el-table-column>
    <el-table-column prop="title" label="Name" width="180"></el-table-column>
    <el-table-column
      prop="arrayToCommaySeperate(permissions)"
      label="Permissions"
    ></el-table-column>
  </el-table>
</template>

<script>
import { paginationParams, sortingParams } from "@/Helper";
import RoleRepository from "@/repository/RoleRepository";
import { mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      roles: "uac/getRoles"
    })
  },
  methods: {
    getRole: async function(payload) {
      await RoleRepository.filterRoles(payload)
        .then(res => {
          this.$store.commit("uac/GET_ROLE_DATA", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrayToCommaySeperate(permissions) {
      let comma = "";
      for (let array = 0; array < permissions.length; array++) {
        comma.append(permissions[array].permission_name);
      }
      return comma;
    }
  },
  beforeMount() {
    this.getRole({
      ...sortingParams("id", "asc"),
      ...paginationParams(1, 3),
      ...this.filter
    });
  }
};
</script>
