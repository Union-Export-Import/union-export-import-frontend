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
  </el-tabs>
  <asset-filter />
</template>

<script>
import List from "@/components/warehouse/List.vue";
import FilterCustomer from "@/components/warehouse/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import Nprogress from "nprogress";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["warehouse"])
  },
  components: {
    "asset-list": List,
    "create-btn": Createbtn,
    "asset-filter": FilterCustomer
  },
  beforeMount() {
    Nprogress.set(0.4);
    this.$store.commit("warehouse/LOADING");
    this.$store
      .dispatch("warehouse/getAssets")
      .then(response => {
        this.$store.commit("warehouse/SET_ASSETS", response.data);
        this.$store.commit("warehouse/STOP_LOADING");
        Nprogress.done();
      })
      .catch(error => {
        this.open2(error.message, "error");
        this.$store.commit("warehouse/STOP_LOADING");
        Nprogress.done();
      });
  },
  methods: {
    AssetPagiClick(pageNo) {
      this.$store.commit("warehouse/LOADING");
      this.$store.dispatch("warehouse/assetPagiClick", pageNo);
    },
    assetSort(column) {
      this.$store.commit("warehouse/LOADING");
      this.$store.dispatch("warehouse/assetSort", column);
    },
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },
    filterBox() {
      this.$store.commit("HANDLE_ASSET_FILTER_BOX");
    }
  }
};
</script>
