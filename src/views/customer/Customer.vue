<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>Customer</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card">
    <el-tab-pane>
      <template #label>
        <span>Customers</span>
      </template>

      <template v-if="customer">
        <el-row>
          <el-col :span="17">
            <p class="pagi-info">
              Total
              {{ customer.customers ? customer.customers.meta.total : 0 }}
              items, current page
              {{
                customer.customers ? customer.customers.meta.current_page : 0
              }}
            </p>
          </el-col>
          <el-col :span="7">
            <ul class="create-filter">
              <li>
                <create-btn name="New Customer" routeName="CustomerCreate" />
              </li>
              <li>
                <p class="sort-by">
                  sorted by
                  <strong class="sorted">{{ this.sortBy.key }}</strong>
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
          :loading="loading"
          @customer-header-click="sortCustomers"
        />
        <el-pagination
          class="center-align mt-3"
          background
          layout="prev, pager, next"
          :total="customer.customers ? customer.customers.meta.total : 1"
          @prev-click="pagiClick"
          @next-click="pagiClick"
          @current-change="pagiClick"
        ></el-pagination>
      </template>
    </el-tab-pane>
  </el-tabs>

  <filter-customer />
</template>

<script>
import CustomerList from "@/components/customer/List.vue";
import FilterCustomer from "@/components/customer/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { paginationParams, sortingParams, filter } from "@/Helper";
import CustomerRepository from "@/repository/CustomerRepository";
import { mapState, mapMutations } from "vuex";
import NProgress from "nprogress";
export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start(); // Start the progress bar
    next();
  },
  components: {
    "customer-list": CustomerList,
    "filter-customer": FilterCustomer,
    "create-btn": Createbtn
  },

  data() {
    return {
      drawer: false,
      sortBy: {
        key: "id",
        type: "desc"
      },
      loading: false
    };
  },

  beforeMount() {
    this.getCustomers({
      ...sortingParams(this.sortBy.key, this.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    });
  },

  computed: {
    ...mapState(["customer"])
  },

  methods: {
    ...mapMutations("customer", ["ADD_CUSTOMER_DATA"]),
    filterBox() {
      this.$store.commit("handleFilterBox");
    },

    getCustomers: async function(payload) {
      this.loading = true;
      await CustomerRepository.filterCustomers(payload)
        .then(res => {
          this.ADD_CUSTOMER_DATA(res.data);
          NProgress.done();
          this.loading = false;
        })
        .catch(err => {
          this.open2(err);
          NProgress.done();
          this.loading = false;
        });
    },
    pagiClick(pageNo) {
      this.getCustomers({
        ...sortingParams(this.sortBy.key, this.sortBy.type),
        ...paginationParams(pageNo, 10),
        ...filter([], "AND")
      });
    },
    sortCustomers(column) {
      if (this.sortBy.key === column) {
        if (this.sortBy.type == "asc") {
          this.sortBy.type = "desc";
          this.getCustomers({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
          });
        } else {
          this.getCustomers({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
          });
        }
      } else {
        this.sortBy.key = column;
        this.getCustomers({
          ...sortingParams(this.sortBy.key, this.sortBy.type),
          ...paginationParams(1, 10),
          ...filter([], "AND")
        });
      }
    },

    open2(error) {
      this.$message({
        showClose: true,
        message: error.message,
        type: "error"
      });
    }
  }
};
</script>
