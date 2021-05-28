<template>
  <el-drawer
    :model-value="assetTypeFilterOpen"
    :direction="direction"
    :before-close="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">Asset Type Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.asset_type"></el-input>
      </el-form-item>
      <div class="clear">
        <p @click="clearForm">Clear</p>
      </div>
      <el-button
        @click="filterAssetType"
        class="filter-button"
        v-loading="loading"
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
import AssetTypeService from "@/services/asset_type/AssetTypeService";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        asset_type: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapState(["assetType"]),
    assetTypeFilterOpen() {
      return this.assetType.open;
    }
  },

  methods: {
    ...mapMutations("assetType", ["SET_ASSET_TYPES", "ASSET_TYPE_FILTER_BOX"]),
    filterBoxClose() {
      this.ASSET_TYPE_FILTER_BOX();
    },
    clearForm() {
      console.log("Clear Form");
    },
    getAssetType: async function(payload) {
      await AssetTypeService.filterAssetType(payload)
        .then(response => {
          this.SET_ASSET_TYPES(response.data);
          this.ASSET_TYPE_FILTER_BOX();
          this.loading = false;
        })
        .catch(e => {
          this.open2(e.message, "error");
          this.loading = false;
        });
    },
    filterAssetType() {
      this.loading = true;
      const { asset_type } = this.form;
      const assetTypeParams = asset_type
        ? filterParams("LIKE", "asset_type", `%${asset_type}%`)
        : null;
      const mappedData = [{ ...assetTypeParams }];
      let filterMap = [];
      mappedData.forEach(function(element) {
        if (Object.keys(element).length != 0) {
          filterMap.push(element);
        }
      });
      this.getAssetType({
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
