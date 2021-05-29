<template>
  <el-drawer
    :model-value="assetFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">Asset Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.asset_name"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <div class="clear">
        <p @click="clearForm">Clear</p>
      </div>
      <el-button @click="filterAssets" class="filter-button" v-loading="loading"
        >Filter</el-button
      >
    </el-form>
  </el-drawer>
</template>

<script>
import {
  paginationParams,
  sortingParams,
  filterParams,
  filter
} from "@/Helper";
// import axios from "@/axios";
import filterService from "@/services/assets/AssetService";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        asset_name: "",
        email: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapState(["warehouse"]),
    assetFilterOpen() {
      return this.warehouse.open;
    }
  },

  methods: {
    ...mapMutations("warehouse", ["SET_ASSETS", "HANDLE_ASSET_FILTER_BOX"]),
    filterBoxClose() {
      this.HANDLE_ASSET_FILTER_BOX();
    },
    clearForm() {
      console.log("Clear Form");
    },
    getAssets: async function(payload) {
      await filterService
        .filterAssets(payload)
        .then(response => {
          this.SET_ASSETS(response.data);
          this.HANDLE_ASSET_FILTER_BOX();
          this.loading = false;
        })
        .catch(e => {
          this.open2(e.message, "error");
          this.loading = false;
        });
    },
    filterAssets() {
      this.loading = true;
      const { asset_name, email } = this.form;
      const assetNameParams = asset_name
        ? filterParams("LIKE", "asset_name", `%${asset_name}%`)
        : null;
      const emailParams = email
        ? filterParams("LIKE", "email", `%${email}%`)
        : null;
      const mappedData = [{ ...assetNameParams }, { ...emailParams }];
      let filterMap = [];
      mappedData.forEach(function(element) {
        if (Object.keys(element).length != 0) {
          filterMap.push(element);
        }
      });
      this.getAssets({
        ...sortingParams("id", "asc"),
        ...paginationParams(1, 10),
        ...filter(filterMap, "AND")
      });
    },
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    }
  }
};
</script>
