<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>Warehouse Management</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="Assets">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info" v-if="warehouse.assets">
            Total {{ warehouse.assets.meta.total }} items, current page
            {{ warehouse.assets.meta.current_page }}
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

      <asset-list
        :data="warehouse.assets.data"
        v-if="warehouse.assets"
        :loading="warehouse.loading"
        @asset-header-click="assetSort"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="warehouse.assets"
        :total="warehouse.assets.meta.total"
        @prev-click="AssetPagiClick"
        @next-click="AssetPagiClick"
        @current-change="AssetPagiClick"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="Asset Types">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info" v-if="warehouse.asset_types">
            Total {{ warehouse.asset_types.meta.total }} items, current page
            {{ warehouse.asset_types.meta.current_page }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Asset Type" routeName="AssetTypeCreate" />
            </li>
            <li>
              <p class="sort-by" v-if="warehouse.sortBy">
                sorted by {{ warehouse.sortBy.key }}
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
        @asset-header-click="assetSort"
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
import Nprogress from "nprogress";
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
  beforeMount() {
    Nprogress.set(0.4);
    this.LOADING();
    this.getAssetTypes();
    // .then(response => {
    //   this.$store.commit("warehouse/SET_ASSET_TYPES", response.data);
    //   this.$store.commit("warehouse/STOP_LOADING");
    //   Nprogress.done();
    // })
    // .catch(error => {
    //   this.open2(error.message, "error");
    //   this.$store.commit("warehouse/STOP_LOADING");
    //   Nprogress.done();
    // });
    this.getAssets()
      .then(response => {
        this.SET_ASSETS(response.data);
        this.STOP_LOADING();
        Nprogress.done();
      })
      .catch(error => {
        this.open2(error.message, "error");
        this.STOP_LOADING();
        Nprogress.done();
      });
  },

  methods: {
    ...mapActions("warehouse", ["getAssets", "assetPagiClick"]),
    ...mapActions("assetType", ["assetTypePagiClick", "getAssetTypes"]),
    ...mapMutations("assetType", ["ASSET_TYPE_FILTER_BOX"]),
    ...mapMutations("warehouse", [
      "SET_ASSETS",
      "STOP_LOADING",
      "LOADING",
      "HANDLE_ASSET_FILTER_BOX"
    ]),

    AssetPagiClick(pageNo) {
      this.assetPagiClick(pageNo);
    },

    AssetTypePagiClick(pageNo) {
      this.assetTypePagiClick(pageNo);
    },

    assetSort(column) {
      this.assetSort(column);
    },

    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },

    filterBox() {
      this.HANDLE_ASSET_FILTER_BOX();
    },
    assetTypeFilter() {
      this.ASSET_TYPE_FILTER_BOX();
    }
  }
};
</script>
