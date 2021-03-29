<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>User Access Control</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane>
      <template #label>
        <span>Users</span>
      </template>
      <template v-if="users && users.data.length > 0">
        <el-row>
          <el-col :span="17">
            <p class="pagi-info">
              Total {{ users.meta.total }} items, current page
              {{ users.meta.current_page }}
            </p>
          </el-col>
          <el-col :span="7">
            <ul class="create-filter">
              <li>
                <create-btn name="New User" routeName="UserCreate" />
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
        <user-list :data="users.data" :loading="loading" @header-click="sortUsers" />
        <el-pagination
          class="center-align mt-3"
          background
          layout="prev, pager, next"
          :total="users.meta.total"
          @prev-click="pagiClick"
          @next-click="pagiClick"
          @current-change="pagiClick"
        ></el-pagination>
      </template>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span>Roles & Permission</span>
      </template>
      <el-row>
        <el-col :span="17">
          <p class="pagi-info">Total 100 items, current page 10</p>
        </el-col>
        <el-col :span="7">
          <ul class="create-filter">
            <li>
              <create-btn name="New Role" routeName="UserCreate" />
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
      <permission-list :data="permissions" />
    </el-tab-pane>
  </el-tabs>

  <filter-user />
</template>

<script>
import UserList from "@/components/uac/List.vue";
import PermissionList from "@/components/uac/PermissionList";
import FilterUser from "@/components/uac/Filter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { paginationParams, sortingParams, filterParams, filter } from "../../Helper";
import UserRepository from "../../repository/UserRepository";
import { mapGetters } from "vuex";

export default {
  components: {
    "user-list": UserList,
    "permission-list": PermissionList,
    "filter-user": FilterUser,
    "create-btn": Createbtn,
  },

  data() {
    return {
      permissions: [],
      drawer: false,
      filter: {
        ...filter([filterParams("<>", "account_status", "Revoke")], "AND"),
      },
      sortBy: {
        key: "id",
        type: "asc",
      },
      loading: false,
    };
  },

  beforeMount() {
    this.getUsers({
      ...sortingParams(this.sortBy.key, this.sortBy.type),
      ...paginationParams(1, 10),
      ...this.filter,
    });
  },

  computed: {
    ...mapGetters({
      users: "uac/getUsers",
    }),
  },

  methods: {
    filterBox() {
      console.log(JSON.stringify(this.permissions));
      this.$store.commit("handleFilterBox");
    },

    getUsers: async function (payload) {
      this.loading = true;
      await UserRepository.filterUsers(payload)
        .then((res) => {
          console.log(res.data);
          this.$store.commit("uac/ADD_UAC_DATA", res.data);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },

    pagiClick(pageNo) {
      console.log("here", pageNo);
      this.getUsers({
        ...sortingParams(this.sortBy.key, this.sortBy.type),
        ...paginationParams(pageNo, 10),
        ...this.filter,
      });
    },

    sortUsers(column) {
      console.log(column.property);
      if (this.sortBy.key == column) {
        if (this.sortBy.type == "asc") {
          this.sortBy.type = "desc";
          this.getUsers({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...this.filter,
          });
        } else {
          this.getUsers({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...this.filter,
          });
        }
      } else {
        this.sortBy.key = column.property;
        this.getUsers({
          ...sortingParams(this.sortBy.key, this.sortBy.type),
          ...paginationParams(1, 10),
          ...this.filter,
        });
      }
    },
  },
};
</script>
