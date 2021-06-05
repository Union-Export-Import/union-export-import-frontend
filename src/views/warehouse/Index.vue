<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>Warehouse Management</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card">
    <el-tab-pane label="Assets">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info">
            Total
            {{ warehouse.assets ? warehouse.assets.meta.total : 0 }}
            items, current page
            {{ warehouse.assets ? warehouse.assets.meta.current_page : 0 }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Asset" routeName="AssetCreate" />
            </li>
            <li>
              <p class="sort-by" v-if="warehouse.sortBy">
                sorted by {{ warehouse.sortBy.key }}
                <strong class="sorted"></strong>
              </p>
            </li>
            <li>
              <img
                @click="filterBox"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1OSA0NTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImZpbHRlciI+CgkJPHBhdGggZD0iTTE3OC41LDM4Mi41aDEwMnYtNTFoLTEwMlYzODIuNXogTTAsNzYuNXY1MWg0NTl2LTUxSDB6IE03Ni41LDI1NWgzMDZ2LTUxaC0zMDZWMjU1eiIgZmlsbD0iIzAwMDAwMDgwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
              />
            </li>
          </ul>
        </el-col>
      </el-row>
      <!-- This is asset list component -->
      <asset-list
        :data="warehouse.assets ? warehouse.assets.data : warehouse.data"
        v-if="warehouse"
        :loading="warehouse.loading"
        @asset-header-click="assetSorting"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="warehouse"
        :total="warehouse.assets ? warehouse.assets.meta.total : 1"
        @prev-click="AssetPagiClick"
        @next-click="AssetPagiClick"
        @current-change="AssetPagiClick"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="Asset Types">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info" v-if="assetType.asset_types">
            Total {{ assetType.asset_types.meta.total }} items, current page
            {{ assetType.asset_types.meta.current_page }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Asset Type" routeName="AssetTypeCreate" />
            </li>
            <li>
              <p class="sort-by" v-if="assetType.sortBy">
                sorted by {{ assetType.sortBy.key }}
                <strong class="sorted"></strong>
              </p>
            </li>
            <li>
              <img
                @click="assetTypeFilter"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1OSA0NTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImZpbHRlciI+CgkJPHBhdGggZD0iTTE3OC41LDM4Mi41aDEwMnYtNTFoLTEwMlYzODIuNXogTTAsNzYuNXY1MWg0NTl2LTUxSDB6IE03Ni41LDI1NWgzMDZ2LTUxaC0zMDZWMjU1eiIgZmlsbD0iIzAwMDAwMDgwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
              />
            </li>
          </ul>
        </el-col>
      </el-row>

      <asset-type-list
        :data="assetType.asset_types.data"
        v-if="assetType.asset_types"
        :loading="assetType.loading"
        @asset-type-header-click="assetTypeSort"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="assetType.asset_types"
        :total="assetType.asset_types.meta.total"
        @prev-click="AssetTypePagiClick"
        @next-click="AssetTypePagiClick"
        @current-change="AssetTypePagiClick"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
  <asset-filter />
  <asset-type-filter />
</template>

<script>
import List from "@/components/warehouse/List.vue";
import AssetTypeList from "@/components/asset_types/List.vue";
import FilterAsset from "@/components/warehouse/Filter.vue";
import FilterAssetType from "@/components/asset_types/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
// import Nprogress from "nprogress";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["warehouse", "assetType"])
  },

  components: {
    "asset-list": List,
    "create-btn": Createbtn,
    "asset-filter": FilterAsset,
    "asset-type-filter": FilterAssetType,
    "asset-type-list": AssetTypeList
  },

  created() {
    // Nprogress.set(0.4);
    //this is  will call asset api when there is no data in assets of state
    if (!this.warehouse.assets) {
      this.LOADING();
      this.getAssetTypes();

      this.getAssets();
    }
  },

  methods: {
    //this are from vuex modules
    ...mapActions("warehouse", ["getAssets", "assetPagiClick", "assetSort"]),
    ...mapActions("assetType", [
      "assetTypePagiClick",
      "getAssetTypes",
      "assetTypeSorting"
    ]),
    ...mapMutations("assetType", ["ASSET_TYPE_FILTER_BOX"]),
    ...mapMutations("warehouse", [
      "SET_ASSETS",
      "STOP_LOADING",
      "LOADING",
      "HANDLE_ASSET_FILTER_BOX"
    ]),

    //this method will handle Asset's pagination
    AssetPagiClick(pageNo) {
      this.assetPagiClick(pageNo);
    },

    //this method will handle Asset Type's pagination
    AssetTypePagiClick(pageNo) {
      this.assetTypePagiClick(pageNo);
    },

    //this method will work when click sorting titles
    assetSorting(column) {
      this.assetSort(column);
    },

    assetTypeSort(column) {
      this.assetTypeSorting(column);
    },

    //this method is for pop up notification of success or error
    notification(message, type) {
      this.$notify({
        title: type,
        message: message,
        type: type
      });
    },

    //this method is to handle Asset Filter form
    filterBox() {
      this.HANDLE_ASSET_FILTER_BOX();
    },

    //this method is to handle Asset Type Filter form
    assetTypeFilter() {
      this.ASSET_TYPE_FILTER_BOX();
    }
  }
};
</script>
