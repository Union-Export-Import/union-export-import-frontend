<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>Category Management</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="Categories">
      <el-row>
        <el-col :span="14">
          <p class="pagi-info">
            Total
            {{ category.categories ? category.categories.meta.total : 0 }}
            items, current page
            {{ category.categories ? category.categories.meta.current_page : 0 }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Category" routeName="category-create" />
            </li>
            <li>
              <p class="sort-by" v-if="category.sortBy">
                sorted by {{ category.sortBy.key }}
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

      <category-list
        :data="category.categories ? category.categories.data : category.data"
        v-if="category"
        :loading="category.loading"
        @category-header-click="categorySort"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="category"
        :total="category.categories ? category.categories.meta.total : 1"
        @prev-click="CategoryPagiClick"
        @next-click="CategoryPagiClick"
        @current-change="CategoryPagiClick"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
  <category-filter />
  <category-type-filter />
</template>

<script>
import List from "@/components/category/List.vue";
import FilterCategory from "@/components/category/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["category"])
  },
  components: {
    "category-list": List,
    "create-btn": Createbtn,
    "category-filter": FilterCategory,
  },
  beforeMount() {
    this.LOADING();
    // this.getCategories();
    this.getCategories()
      .then(response => {
        this.SET_CATEGORIES(response.data);
        this.STOP_LOADING();
      })
      .catch(error => {
        this.open2(error.message, "error");
        this.STOP_LOADING();
      });
  },

  methods: {
    ...mapActions("category", ["getCategories", "categoryPagiClick"]),
    ...mapMutations("category", [
      "SET_CATEGORIES",
      "STOP_LOADING",
      "LOADING",
      "HANDLE_CATEGORY_FILTER_BOX"
    ]),

    CategoryPagiClick(pageNo) {
      this.categoryPagiClick(pageNo);
    },

    categorySort(column) {
      this.categorySort(column);
    },

    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },

    filterBox() {
      this.HANDLE_CATEGORY_FILTER_BOX();
    },
    categoryFilter() {
      this.CATEGORY_FILTER_BOX();
    }
  }
};
</script>
