<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>Supplier Management</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="Suppliers">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info">
            Total
            {{ supplier.suppliers ? supplier.suppliers.meta.total : 0 }}
            items, current page
            {{ supplier.suppliers ? supplier.suppliers.meta.current_page : 0 }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Supplier" routeName="SupplierCreate" />
            </li>
            <li>
              <p class="sort-by" v-if="supplier.sortBy">
                sorted by {{ supplier.sortBy.key }}
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

      <supplier-list
        :data="supplier.suppliers ? supplier.suppliers.data : supplier.data"
        v-if="supplier"
        :loading="supplier.loading"
        @supplier-header-click="supplierSort"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="supplier"
        :total="supplier.suppliers ? supplier.suppliers.meta.total : 1"
        @prev-click="SupplierPagiClick"
        @next-click="SupplierPagiClick"
        @current-change="SupplierPagiClick"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
  <supplier-filter />
</template>

<script>
import List from "@/components/supplier/List.vue";
import FilterSupplier from "@/components/supplier/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["supplier"])
  },
  components: {
    "supplier-list": List,
    "create-btn": Createbtn,
    "supplier-filter": FilterSupplier,
  },
  beforeMount() {
    this.LOADING();
    // this.getSuppliers();
    this.getSuppliers()
      .then(response => {
        this.SET_SUPPLIERS(response.data);
        this.STOP_LOADING();
      })
      .catch(error => {
        this.open2(error.message, "error");
        this.STOP_LOADING();
      });
  },

  methods: {
    ...mapActions("supplier", ["getSuppliers", "supplierPagiClick"]),
    ...mapMutations("supplier", [
      "SET_SUPPLIERS",
      "STOP_LOADING",
      "LOADING",
      "HANDLE_SUPPLIER_FILTER_BOX"
    ]),

    SupplierPagiClick(pageNo) {
      this.supplierPagiClick(pageNo);
    },

    supplierSort(column) {
      this.supplierSort(column);
    },

    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },

    filterBox() {
      this.HANDLE_SUPPLIER_FILTER_BOX();
    },
    supplierFilter() {
      this.SUPPLIER_FILTER_BOX();
    }
  }
};
</script>
