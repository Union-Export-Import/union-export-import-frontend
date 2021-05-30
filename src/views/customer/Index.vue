<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>Customer Management</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="Customers">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info">
            Total
            {{ customer.customers ? customer.customers.meta.total : 0 }}
            items, current page
            {{ customer.customers ? customer.customers.meta.current_page : 0 }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Customer" routeName="CustomerCreate" />
            </li>
            <li>
              <p class="sort-by" v-if="customer.sortBy">
                sorted by {{ customer.sortBy.key }}
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

      <customer-list
        :data="customer.customers ? customer.customers.data : customer.data"
        v-if="customer"
        :loading="customer.loading"
        @customer-header-click="customerSort"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="customer"
        :total="customer.customers ? customer.customers.meta.total : 1"
        @prev-click="CustomerPagiClick"
        @next-click="CustomerPagiClick"
        @current-change="CustomerPagiClick"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
  <customer-filter />
  <customer-type-filter />
</template>

<script>
import List from "@/components/customer/List.vue";
import FilterCustomer from "@/components/customer/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["customer"])
  },
  components: {
    "customer-list": List,
    "create-btn": Createbtn,
    "customer-filter": FilterCustomer,
  },
  beforeMount() {
    this.LOADING();
    // this.getCustomers();
    this.getCustomers()
      .then(response => {
        this.SET_CUSTOMERS(response.data);
        this.STOP_LOADING();
      })
      .catch(error => {
        this.open2(error.message, "error");
        this.STOP_LOADING();
      });
  },

  methods: {
    ...mapActions("customer", ["getCustomers", "customerPagiClick"]),
    ...mapMutations("customer", [
      "SET_CUSTOMERS",
      "STOP_LOADING",
      "LOADING",
      "HANDLE_CUSTOMER_FILTER_BOX"
    ]),

    CustomerPagiClick(pageNo) {
      this.customerPagiClick(pageNo);
    },

    customerSort(column) {
      this.customerSort(column);
    },

    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },

    filterBox() {
      this.HANDLE_CUSTOMER_FILTER_BOX();
    },
    customerFilter() {
      this.CUSTOMER_FILTER_BOX();
    }
  }
};
</script>
