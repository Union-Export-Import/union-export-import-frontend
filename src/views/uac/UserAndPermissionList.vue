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
      <template v-if="users">
        <el-row>
          <el-col :span="14">
            <p class="pagi-info">
              Total {{ users.meta.total }} items, current page
              {{ users.meta.current_page }}
            </p>
          </el-col>
          <el-col :span="10">
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
        <user-list
          v-if="users"
          :data="users.data"
          :loading="loading"
          @user-header-click="sortUsers"
        />
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
      <template v-if="roles">
        <el-row>
          <el-col :span="14">
            <p class="pagi-info">
              Total {{ roles.meta.total }} items, current page
              {{ roles.meta.current_page }}
            </p>
          </el-col>
          <el-col :span="10">
            <ul class="create-filter">
              <li>
                <create-btn name="New Role" routeName="RoleCreate" />
              </li>
              <li>
                <p class="sort-by">
                  sorted by
                  <strong class="sorted">{{ this.sortBy.key }}</strong>
                </p>
              </li>
              <li>
                <img
                  @click="filterRole"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1OSA0NTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImZpbHRlciI+CgkJPHBhdGggZD0iTTE3OC41LDM4Mi41aDEwMnYtNTFoLTEwMlYzODIuNXogTTAsNzYuNXY1MWg0NTl2LTUxSDB6IE03Ni41LDI1NWgzMDZ2LTUxaC0zMDZWMjU1eiIgZmlsbD0iIzAwMDAwMDgwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                />
              </li>
            </ul>
          </el-col>
        </el-row>
      </template>

      <permission-list
        v-if="roles"
        :data="roles.data"
        :loading="loading"
        @roleHeaderClick="sortRoles"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        v-if="roles"
        :total="roles.meta.total"
        @prev-click="RolePagiClick"
        @next-click="RolePagiClick"
        @current-change="RolePagiClick"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
  <role-filter />
  <filter-user />
</template>

<script>
import UserList from "@/components/uac/List.vue";
import PermissionList from "@/components/uac/PermissionList";
import FilterUser from "@/components/uac/Filter.vue";
import RoleFilter from "@/components/uac/RoleFilter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { paginationParams, sortingParams, filter } from "@/Helper";
import UserRepository from "@/repository/UserRepository";
import RoleRepository from "@/repository/RoleRepository";
import { mapGetters } from "vuex";
import NProgress from "nprogress";
export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start(); // Start the progress bar
    next();
  },
  components: {
    "user-list": UserList,
    "permission-list": PermissionList,
    "filter-user": FilterUser,
    "role-filter": RoleFilter,
    "create-btn": Createbtn
  },

  data() {
    return {
      permissions: [],
      sortBy: {
        key: "id",
        type: "desc"
      },
      loading: false
    };
  },

  beforeMount() {
    this.getUsers({
      ...sortingParams(this.sortBy.key, this.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    });
    this.getRoles({
      ...sortingParams(this.sortBy.key, this.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    });
  },

  computed: {
    ...mapGetters({
      users: "uac/getUsers",
      roles: "uac/getRoles"
    })
  },

  methods: {
    filterBox() {
      this.$store.commit("handleFilterBox");
    },
    filterRole() {
      this.$store.commit("HANDLE_ROLE_FILTER_BOX");
    },
    getUsers: async function(payload) {
      this.loading = true;
      await UserRepository.filterUsers(payload)
        .then(res => {
          this.$store.commit("uac/ADD_UAC_DATA", res.data);
          NProgress.done();
          this.loading = false;
        })
        .catch(err => {
          this.open2(err.message, "error");
          NProgress.done();
          this.loading = false;
        });
    },
    getRoles: async function(payload) {
      this.loading = true;
      await RoleRepository.filterRoles(payload)
        .then(res => {
          this.$store.commit("uac/ADD_ROLE_DATA", res.data);
          NProgress.done();
          this.loading = false;
        })
        .catch(err => {
          this.open2(err.message, "error");
          NProgress.done();
          this.loading = false;
        });
    },

    pagiClick(pageNo) {
      this.getUsers({
        ...sortingParams(this.sortBy.key, this.sortBy.type),
        ...paginationParams(pageNo, 10),
        ...filter([], "AND")
      });
    },
    RolePagiClick(pageNo) {
      this.getRoles({
        ...sortingParams(this.sortBy.key, this.sortBy.type),
        ...paginationParams(pageNo, 10),
        ...filter([], "AND")
      });
    },

    sortUsers(column) {
      if (this.sortBy.key === column) {
        if (this.sortBy.type == "asc") {
          this.sortBy.type = "desc";
          this.getUsers({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
          });
        } else {
          this.getUsers({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
          });
        }
      } else {
        this.sortBy.key = column;
        this.getUsers({
          ...sortingParams(this.sortBy.key, this.sortBy.type),
          ...paginationParams(1, 10),
          ...filter([], "AND")
        });
      }
    },
    sortRoles(column) {
      if (this.sortBy.key == column) {
        if (this.sortBy.type == "asc") {
          this.sortBy.type = "desc";
          this.getRoles({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
          });
        } else {
          this.getRoles({
            ...sortingParams(this.sortBy.key, this.sortBy.type),
            ...paginationParams(1, 10),
            ...filter([], "AND")
          });
        }
      } else {
        console.log("come here", column);
        this.sortBy.key = column;
        this.getRoles({
          ...sortingParams(this.sortBy.key, this.sortBy.type),
          ...paginationParams(1, 10),
          ...filter([], "AND")
        });
      }
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
